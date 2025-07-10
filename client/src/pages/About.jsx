import React from 'react';

const About = () => {
  return (
    <div className="bg-white text-black min-h-screen px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Learn more about the mission, vision, and values behind our MOOC platform.
        </p>

        {/* Mission */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">🎯 Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            To democratize education by offering high-quality, accessible online learning opportunities to everyone —
            regardless of location, background, or skill level. We believe learning should be empowering and personalized.
          </p>
        </section>

        {/* Vision */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">🌍 Our Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            A world where anyone can upskill and grow using intelligent, AI-driven educational tools.
            Our platform supports learners, instructors, and institutions with powerful dashboards and insights.
          </p>
        </section>

        {/* Values */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">💡 Core Values</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>Inclusivity:</strong> Education for all.</li>
            <li><strong>Innovation:</strong> Leveraging AI to enhance learning outcomes.</li>
            <li><strong>Integrity:</strong> Honest, transparent, and student-centered development.</li>
            <li><strong>Excellence:</strong> Committed to continuous improvement and quality content.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;
