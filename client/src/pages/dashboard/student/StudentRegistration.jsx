import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_id: "",
    gender: "",
    age: "",
    highest_education: "",
    num_of_prev_attempts: "",
    studied_credits: "",
    disability: "",
    registration_date: "",
    prev_courses_studied: "",
    prev_grade: "",
    email_add: "",
    phone_no: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/courses");
    console.log("Submitted Data:", formData);
  };

  return (
    <section className="w-full min-h-screen bg-gray-100 py-10 px-4 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center text-indigo-600">Student Registration</h1>
        <p className="text-center text-gray-500 mb-8">Please fill in your biodata information</p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User ID */}
          <div>
            <label className="block font-medium mb-2">User ID</label>
            <input
              type="text"
              name="user_id"
              value={formData.user_id}
              onChange={handleChange}
              placeholder="Enter your ID"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block font-medium mb-2">Gender</label>
            <div className="flex gap-4">
              {["Male", "Female", "Other"].map((g) => (
                <label key={g} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={formData.gender === g}
                    onChange={handleChange}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  {g}
                </label>
              ))}
            </div>
          </div>

          {/* Age */}
          <div>
            <label className="block font-medium mb-2">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter your age"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Highest Education */}
          <div>
            <label className="block font-medium mb-2">Highest Education</label>
            <select
              name="highest_education"
              value={formData.highest_education}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="">Select</option>
              <option value="High School">High School</option>
              <option value="Diploma">Diploma</option>
              <option value="Bachelor's Degree">Bachelor's Degree</option>
              <option value="Master's Degree">Master's Degree</option>
              <option value="PhD">PhD</option>
            </select>
          </div>

          {/* Previous Attempts */}
          <div>
            <label className="block font-medium mb-2">Number of Previous Attempts</label>
            <input
              type="number"
              name="num_of_prev_attempts"
              value={formData.num_of_prev_attempts}
              onChange={handleChange}
              placeholder="Enter attempts"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Studied Credits */}
          <div>
            <label className="block font-medium mb-2">Studied Credits</label>
            <input
              type="number"
              name="studied_credits"
              value={formData.studied_credits}
              onChange={handleChange}
              placeholder="Enter credits"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Disability */}
          <div>
            <label className="block font-medium mb-2">Disability Status</label>
            <div className="flex gap-4">
              {["Yes", "No"].map((d) => (
                <label key={d} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="disability"
                    value={d}
                    checked={formData.disability === d}
                    onChange={handleChange}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  {d}
                </label>
              ))}
            </div>
          </div>

          {/* Registration Date */}
          <div>
            <label className="block font-medium mb-2">Registration Date</label>
            <input
              type="date"
              name="registration_date"
              value={formData.registration_date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Previous Courses Studied */}
          <div>
            <label className="block font-medium mb-2">Previous Courses Studied</label>
            <input
              type="text"
              name="prev_courses_studied"
              value={formData.prev_courses_studied}
              onChange={handleChange}
              placeholder="List your previous courses"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Previous Grade */}
          <div>
            <label className="block font-medium mb-2">Previous Grade</label>
            <select
              name="prev_grade"
              value={formData.prev_grade}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="">Select grade</option>
              <option value="A+">A+</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="F">F</option>
            </select>
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-2">Email Address</label>
            <input
              type="email"
              name="email_add"
              value={formData.email_add}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone_no"
              value={formData.phone_no}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default StudentRegistration;
