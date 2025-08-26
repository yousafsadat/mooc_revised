import sys
import json
import pickle
import numpy as np
from tensorflow.keras.models import load_model

# Load the trained Keras model and pre-processors
try:
    # Load the Keras model. You can use either .h5 or .keras format.
    # The .keras format is the recommended standard since TensorFlow 2.13.
    # Let's use the .h5 format as it's very common.
    model = load_model('my_model_balanced.h5')
    
    with open('scaler.pkl', 'rb') as f:
        scaler = pickle.load(f)
    with open('label_encoder.pkl', 'rb') as f:
        label_encoder = pickle.load(f)
except FileNotFoundError:
    # This will now include the Keras model file.
    print(json.dumps({"error": "Model or pre-processor files not found. Make sure my_model_balanced.h5, scaler.pkl, and label_encoder.pkl are in the same directory."}))
    sys.exit(1)
except Exception as e:
    print(json.dumps({"error": f"Failed to load files: {e}"}))
    sys.exit(1)

def predict(input_data):
    """
    Function to preprocess data and make a prediction using the Keras model.
    """
    try:
        # Assuming input_data is a list of features from the API
        features = np.array([float(x) for x in input_data])

        # Reshape for single sample prediction
        features = features.reshape(1, -1)

        # Scale the features
        scaled_features = scaler.transform(features)
        
        # NOTE: Your model is likely a CNN-LSTM or similar. 
        # The input data shape for such models is often 3D: (samples, timesteps, features).
        # You may need to reshape `scaled_features` further, for example:
        #
        # num_timesteps = ... # This depends on your model's input shape
        # num_features = ...  # This depends on your model's input shape
        # final_input_shape = scaled_features.reshape(1, num_timesteps, num_features)
        # prediction = model.predict(final_input_shape)

        # Let's assume for this example the input is a simple sequence for the LSTM part
        # and doesn't require a complex CNN-style reshape.
        # Reshape to a 3D tensor: (1, sequence_length, number_of_features_per_timestep)
        # You need to know the expected sequence length and feature count from your model training.
        # For a single sequence, reshape to (1, len(scaled_features[0]), 1) if each feature is a timestep
        # or something similar.
        
        # For simplicity, let's assume a basic dense layer prediction for this example.
        # YOU MUST ADJUST THIS PART based on your model's input shape.
        prediction = model.predict(scaled_features)

        # Your model likely outputs probabilities for different classes.
        # Get the predicted class index (if it's a classification model)
        predicted_class_index = np.argmax(prediction, axis=1)

        # Decode the prediction using the label encoder
        predicted_label = label_encoder.inverse_transform(predicted_class_index)

        # Return the prediction result.
        return {"prediction": predicted_label.tolist()[0]}

    except Exception as e:
        return {"error": str(e)}

if __name__ == '__main__':
    if len(sys.argv) > 1:
        try:
            input_json = json.loads(sys.argv[1])
            input_features = input_json.get('features')
            
            if not input_features:
                 print(json.dumps({"error": "Input 'features' not found in JSON data."}))
                 sys.exit(1)

            result = predict(input_features)
            print(json.dumps(result))

        except json.JSONDecodeError:
            print(json.dumps({"error": "Invalid JSON input."}))
        except Exception as e:
            print(json.dumps({"error": str(e)}))
    else:
        print(json.dumps({"error": "No input data provided."}))