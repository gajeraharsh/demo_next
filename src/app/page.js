'use client';

import { useEffect, useState } from 'react';

export default function HomePage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch('/api/news');
        const data = await res.json();
        
        // Access the news items from RSS structure
        const items = data?.data?.rss?.channel?.item || [];
        setNews(items);
      } catch (error) {
        console.error('Failed to fetch news:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Latest News</h1>
      <div className="space-y-4">
        {news.map((item, index) => (
          <div key={index} className="p-4 border rounded shadow">
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold">
              {item.title}
            </a>
            <p className="text-sm text-gray-600">{new Date(item.pubDate).toLocaleString()}</p>
            <p className="mt-2">{item.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
