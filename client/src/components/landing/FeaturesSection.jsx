import React from 'react';
import SchoolIcon from '@mui/icons-material/School';
import InsightsIcon from '@mui/icons-material/Insights';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

const features = [
  {
    icon: <SchoolIcon className="text-blue-500 text-4xl" />,
    title: 'Smart Student Dashboard',
    description: 'Track your progress, enroll in courses, and download certificates in one place.',
  },
  {
    icon: <InsightsIcon className="text-blue-500 text-4xl" />,
    title: 'Predictive Dropout Analytics',
    description: 'Leverage AI to identify and prevent dropouts before they happen.',
  },
  {
    icon: <SupervisorAccountIcon className="text-blue-500 text-4xl" />,
    title: 'Role-Based Access',
    description: 'Admin, instructor, and student dashboards designed for every stakeholder.',
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-white px-6 text-center">
      <h2 className="text-3xl font-bold text-black mb-4">What Makes Us Different</h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-12">
        A complete learning and course management system that empowers education through insights.
      </p>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div key={index} className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-md transition">
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-black">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
