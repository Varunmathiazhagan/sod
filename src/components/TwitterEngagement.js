import React, { useState } from 'react';

function TwitterEngagement() {
  const [username, setUsername] = useState('');
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    if (!username) {
      setError("Please enter a username.");
      return;
    }

    setLoading(true);
    setError(null);
    setProfileData(null);

    try {
      const response = await fetch('http://localhost:5000/get_profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile data.');
      }

      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
      } else {
        setProfileData(data);
        console.log('Profile Data:', data);  // Add this line to log the profile data
      }
    } catch (error) {
      setError('Error fetching profile data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Twitter Profile Engagement</h1>
      
      <div className="mb-6">
        <div className="flex space-x-2">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Twitter Username"
            className="flex-grow px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={fetchProfile}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Fetch Profile
          </button>
        </div>
      </div>

      {loading && <div className="text-center">Loading...</div>}

      {error && <div className="text-center text-red-600">{error}</div>}

      {profileData && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <img src={profileData.profile_photo || '/placeholder.svg'} alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-center mb-4">{username}</h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <p className="text-gray-600">Posts</p>
                <p className="text-xl font-bold">{profileData.posts}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600">Following</p>
                <p className="text-xl font-bold">{profileData.following}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600">Followers</p>
                <p className="text-xl font-bold">{profileData.followers}</p>
              </div>
            </div>
            <p className="text-center mb-4">{profileData.bio || 'No bio available'}</p>
            <p className="text-center text-gray-600">Joined: {profileData.joined_date}</p>
          </div>
          
          <div className="bg-gray-50 p-6">
            <h3 className="text-xl font-bold mb-4">Recent Tweets</h3>
            <ul className="space-y-4">
              {profileData.tweets.map((tweet, index) => (
                <li key={index} className="bg-white p-4 rounded-lg shadow">
                  <p className="mb-2">{tweet.text}</p>
                  <p className="text-sm text-gray-600">{tweet.date}</p>
                  <p className="text-sm font-semibold mt-2">Sentiment Score: {tweet.sentiment}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default TwitterEngagement;