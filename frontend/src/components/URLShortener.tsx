import React, { useState, useEffect } from 'react';
import { Link, Copy, Check, ExternalLink } from 'lucide-react';

interface ShortenedURL {
  _id: string;
  originalUrl: string;
  shortUrl: string;
  shortCode: string;
  clicks: number;
  createdAt: string;
}

const URLShortener: React.FC = () => {
  const [url, setUrl] = useState('');
  const [shortenedUrls, setShortenedUrls] = useState<ShortenedURL[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [error, setError] = useState('');

  // Load existing URLs on component mount
  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/urls');
      if (response.ok) {
        const urls = await response.json();
        setShortenedUrls(urls);
      }
    } catch (error) {
      console.error('Error fetching URLs:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl: url }),
      });

      const data = await response.json();

      if (response.ok) {
        setShortenedUrls(prev => [data, ...prev.filter(u => u._id !== data._id)]);
        setUrl('');
      } else {
        setError(data.error || 'Failed to shorten URL');
      }
    } catch {
      setError('Network error. Please make sure the server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* URL Input Form */}
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 border border-white/20">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Link className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter your long URL here (e.g., https://www.example.com/very/long/path)"
              className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all duration-200"
            />
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={isLoading || !url.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Shortening...
              </>
            ) : (
              <>
                <Link className="w-5 h-5" />
                Shorten URL
              </>
            )}
          </button>
        </form>
      </div>

      {/* Shortened URLs List */}
      {shortenedUrls.length > 0 && (
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Link className="w-5 h-5" />
              Your Shortened URLs
            </h3>
            <p className="text-gray-600 mt-1">Click on any short URL to redirect to the original</p>
          </div>
          
          <div className="divide-y divide-gray-100">
            {shortenedUrls.map((item) => (
              <div key={item._id} className="p-6 hover:bg-gray-50/50 transition-colors duration-200">
                <div className="flex flex-col space-y-4">
                  {/* Original URL */}
                  <div>
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      Original URL
                    </label>
                    <p className="text-gray-800 break-all mt-1">{item.originalUrl}</p>
                  </div>
                  
                  {/* Shortened URL */}
                  <div>
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      Short URL
                    </label>
                    <div className="flex items-center gap-3 mt-1">
                      <a
                        href={item.shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-medium break-all flex items-center gap-1 hover:underline"
                      >
                        {item.shortUrl}
                        <ExternalLink className="w-4 h-4 flex-shrink-0" />
                      </a>
                      <button
                        onClick={() => copyToClipboard(item.shortUrl, item._id)}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                        title="Copy to clipboard"
                      >
                        {copiedId === item._id ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t border-gray-100">
                    <span>Created: {new Date(item.createdAt).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" />
                      {item.clicks} clicks
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default URLShortener;