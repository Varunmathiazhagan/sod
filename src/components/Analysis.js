import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaYoutube } from 'react-icons/fa';

function Analysis() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-blue-600 text-center mb-8">Analysis</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
          <div className="text-5xl text-blue-400 mb-4 flex justify-center">
            <FaTwitter />
          </div>
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Twitter Analysis</h2>
          <p className="text-gray-700 mb-6">
            Get insights on recent tweets, sentiment analysis, and engagement trends. Perfect for understanding audience reactions and follower growth.
          </p>
          <Link
            to="/twitter-engagement"
            className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300 inline-block"
          >
            Explore Twitter
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
          <div className="text-5xl text-red-500 mb-4 flex justify-center">
            <FaYoutube />
          </div>
          <h2 className="text-2xl font-semibold text-red-600 mb-4">YouTube Report</h2>
          <p className="text-gray-700 mb-6">
            Fetch data on your latest videos, including views, likes, comments, and detailed engagement metrics. Ideal for content performance analysis.
          </p>
          <Link
            to="/youtube-dashboard"
            className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors duration-300 inline-block"
          >
            Explore YouTube
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Analysis;