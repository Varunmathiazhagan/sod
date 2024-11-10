import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [typedText, setTypedText] = useState('');
  const [currentTip, setCurrentTip] = useState(0);

  const aboutText = "Our Social Media Dashboard Analyzer helps you track and understand the impact of your posts across various platforms. Get real-time insights into engagement, analyze audience sentiment, and visualize data through detailed charts. Whether you're a marketer, business owner, or influencer, our tool empowers you to make data-driven decisions and enhance your social media strategy.";

  const tips = [
    "Be consistent with your posting schedule to keep your audience engaged.",
    "Use analytics to understand what content resonates most with your audience.",
    "Engage with your followers by responding to comments and direct messages.",
    "Use hashtags strategically to expand the reach of your posts."
  ];

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < aboutText.length) {
        setTypedText(prev => prev + aboutText.charAt(index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    const tipInterval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % tips.length);
    }, 3000);

    return () => {
      clearInterval(typingInterval);
      clearInterval(tipInterval);
    };
  }, []);

  return (
    <div className="space-y-12">
      <section className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">About Our Dashboard</h2>
        <p className="text-lg text-gray-700 leading-relaxed">{typedText}</p>
      </section>

      <section className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">Social Media Tips</h2>
        <div className="text-lg text-gray-700 leading-relaxed h-24">
          {tips.map((tip, index) => (
            <div
              key={index}
              className={`transition-opacity duration-500 ${
                index === currentTip ? 'opacity-100' : 'opacity-0 hidden'
              }`}
            >
              {tip}
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-2xl font-semibold text-blue-600 mb-3">Real-time Analytics</h3>
          <p className="text-gray-700">Get insights into your social media performance with real-time data.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-2xl font-semibold text-blue-600 mb-3">User Sentiment</h3>
          <p className="text-gray-700">Analyze how users feel about your posts and content.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-2xl font-semibold text-blue-600 mb-3">Engagement Graphs</h3>
          <p className="text-gray-700">Generate detailed graphs on likes, comments, and shares.</p>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;