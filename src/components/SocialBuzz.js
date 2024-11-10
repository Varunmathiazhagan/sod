import React, { useState, useEffect } from 'react';

function SocialBuzz() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const apiKey = '8b6c001fd05c4f099e617d5dffb8deae'; // Replace with your actual API key
      const today = new Date();
      const lastWeek = new Date(today);
      lastWeek.setDate(today.getDate() - 7);
      const formattedDate = lastWeek.toISOString().split('T')[0];
      
      const response = await fetch(`https://newsapi.org/v2/everything?q=social+media&from=${formattedDate}&apiKey=${apiKey}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      
      const data = await response.json();
      setArticles(data.articles);
      setLoading(false);
    } catch (error) {
      setError('Failed to load news articles. Please try again later.');
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center text-2xl text-blue-600 mt-8">Loading news articles...</div>;
  }

  if (error) {
    return <div className="text-center text-2xl text-red-600 mt-8">{error}</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-blue-600 text-center mb-8">Latest News on Social Media Apps</h1>
      
      {articles.length === 0 ? (
        <div className="text-center text-2xl text-gray-600">No articles found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {article.urlToImage && (
                <img src={article.urlToImage} alt={article.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-blue-600 mb-2">{article.title}</h2>
                <p className="text-gray-700 mb-4">{article.description || "No description available."}</p>
                <p className="text-sm text-gray-500 text-right">Source: {article.source.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SocialBuzz;