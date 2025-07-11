import React from 'react';

const FeaturesSection = () => {
  return (
    <section className="bg-gray-50 py-12 px-6 grid md:grid-cols-3 gap-6 text-center">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-3xl font-bold text-blue-600">11,031+</h2>
        <p className="text-sm text-gray-500">Active Students</p>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-3xl font-bold text-green-600">24+</h2>
        <p className="text-sm text-gray-500">Courses Available</p>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-3xl font-bold text-purple-600">76%</h2>
        <p className="text-sm text-gray-500">Average Completion</p>
      </div>
    </section>
  );
};

export default FeaturesSection;
