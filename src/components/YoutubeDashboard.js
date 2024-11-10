import React, { useState } from 'react';
import Plot from 'react-plotly.js';

function YoutubeDashboard() {
  const [channelName, setChannelName] = useState('');
  const [channelData, setChannelData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchChannelData = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setChannelData(null);

    try {
      const response = await fetch(`http://localhost:5000/api/channel/${channelName}`);
      
      if (!response.ok) {
        throw new Error('Channel not found or error in fetching data.');
      }
      
      const data = await response.json();
      setChannelData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderCharts = () => {
    if (!channelData || !channelData.recentVideos) return null;

    const videoTitles = channelData.recentVideos.map(video => video.title);
    const likes = channelData.recentVideos.map(video => video.likes);
    const comments = channelData.recentVideos.map(video => video.comments);

    return (
      <div className="space-y-8">
        <Plot
          data={[
            {
              x: videoTitles,
              y: likes,
              type: 'bar',
              name: 'Likes',
              marker: { color: '#0d94d2' }
            }
          ]}
          layout={{
            title: 'Recent Videos Likes',
            xaxis: { title: 'Video Titles' },
            yaxis: { title: 'Number of Likes' },
            autosize: true
          }}
          useResizeHandler={true}
          style={{width: "100%", height: "100%"}}
        />

        <Plot
          data={[
            {
              x: videoTitles,
              y: comments,
              type: 'bar',
              name: 'Comments',
              marker: { color: '#f39c12' }
            }
          ]}
          layout={{
            title: 'Recent Videos Comments',
            xaxis: { title: 'Video Titles' },
            yaxis: { title: 'Number of Comments' },
            autosize: true
          }}
          useResizeHandler={true}
          style={{width: "100%", height: "100%"}}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Plot
            data={[
              {
                labels: videoTitles.slice(0, 5).map((_, index) => `Video ${index + 1}`),
                values: likes.slice(0, 5),
                type: 'pie',
                textinfo: 'label+percent',
                marker: { colors: ['#0d94d2', '#3498db', '#5dade2', '#85c1e9', '#a9cce3'] },
                hole: 0.4
              }
            ]}
            layout={{
              title: 'Likes Distribution of Top 5 Videos',
              autosize: true
            }}
            useResizeHandler={true}
            style={{width: "100%", height: "100%"}}
          />

          <Plot
            data={[
              {
                labels: videoTitles.slice(0, 5).map((_, index) => `Video ${index + 1}`),
                values: comments.slice(0, 5),
                type: 'pie',
                textinfo: 'label+percent',
                marker: { colors: ['#f39c12', '#e67e22', '#d35400', '#e74c3c', '#c0392b'] },
                hole: 0.4
              }
            ]}
            layout={{
              title: 'Comments Distribution of Top 5 Videos',
              autosize: true
            }}
            useResizeHandler={true}
            style={{width: "100%", height: "100%"}}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">YouTube Dashboard</h1>
      
      <form onSubmit={fetchChannelData} className="mb-8">
        <div className="flex space-x-2">
          <input
            type="text"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            placeholder="Enter Channel Name"
            className="flex-grow px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>
      </form>

      {loading && <div className="text-center">Loading channel data, please wait...</div>}

      {error && <div className="text-center text-red-600">{error}</div>}

      {channelData && (
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <img src={channelData.stats.channelThumbnail} alt="Channel thumbnail" className="w-32 h-32 rounded-full mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-blue-600">{channelData.stats.channelName}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-semibold mb-2">Subscribers</h3>
              <p className="text-3xl font-bold text-blue-600">{channelData.stats.totalSubscribers}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-semibold mb-2">Total Views</h3>
              <p className="text-3xl font-bold text-blue-600">{channelData.stats.totalViews}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-semibold mb-2">Total Videos</h3>
              <p className="text-3xl font-bold text-blue-600">{channelData.stats.totalVideos}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Recent Videos</h3>
            <div className="space-y-4">
              {channelData.recentVideos.map((video, index) => (
                <div key={index} className="border-b pb-4">
                  <h4 className="font-semibold">{video.title}</h4>
                  <p className="text-sm text-gray-600">Published on: {new Date(video.publishedAt).toLocaleDateString()}</p>
                  <p className="text-sm">Views: {video.views} | Likes: {video.likes} | Comments: {video.comments}</p>
                </div>
              ))}
            </div>
          </div>

          {renderCharts()}
        </div>
      )}
    </div>
  );
}

export default YoutubeDashboard;