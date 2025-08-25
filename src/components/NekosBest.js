'use client';

import { useState, useEffect } from 'react';

const NekosBest = () => {
  const hardcodedCategories = ["neko", "waifu", "husbando", "kitsune", "lurk", "shoot", "sleep", "shrug", "stare", "wave", "poke", "smile", "peck", "wink", "blush", "smug", "tickle", "yeet", "think", "highfive", "feed", "bite", "bored", "nom", "yawn", "facepalm", "cuddle", "kick", "happy", "hug", "baka", "pat", "angry", "run", "nod", "nope", "kiss", "dance", "punch", "handshake", "slap", "cry", "pout", "handhold", "thumbsup", "laugh"];
  const [categories, setCategories] = useState(hardcodedCategories);
  const [selectedCategory, setSelectedCategory] = useState(hardcodedCategories[0]);
  const [type, setType] = useState('1'); // 1 for image, 2 for gif
  const [amount, setAmount] = useState(1);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Removed useEffect for fetching categories as they are now hardcoded

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults([]);

    let url = 'https://nekos.best/api/v2/';

    if (query) {
      url += `search?query=${query}&type=${type === '1' ? 'image' : 'gif'}&category=${selectedCategory}&amount=${amount}`;
    } else {
      url += `${selectedCategory}?amount=${amount}`;
    }

    console.log('Fetching URL:', url); // Log the constructed URL

    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log('API Results Data (stringified):', JSON.stringify(data, null, 2)); // Log the results data
      setResults(data.results);
    } catch (err) {
      console.error('Failed to fetch results:', err);
      setError('Failed to fetch results. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* <h1 className="text-3xl font-bold text-center mb-8">Nekoss</h1> */}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
            <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
              Category:
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
            <span className="block text-gray-700 text-sm font-bold mb-2">Type:</span>
            <div className="mt-2">
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  className="form-radio"
                  name="type"
                  value="1"
                  checked={type === '1'}
                  onChange={(e) => setType(e.target.value)}
                />
                <span className="ml-2">Image</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="type"
                  value="2"
                  checked={type === '2'}
                  onChange={(e) => setType(e.target.value)}
                />
                <span className="ml-2">GIF</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
            <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">
              Amount (1-20):
            </label>
            <input
              type="number"
              id="amount"
              min="1"
              max="20"
              value={amount}
              onChange={(e) => setAmount(Math.max(1, Math.min(20, Number(e.target.value))))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
            <label htmlFor="query" className="block text-gray-700 text-sm font-bold mb-2">
              Search Query (optional):
            </label>
            <input
              type="text"
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Anime name, artist, or keyword"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? 'Fetching...' : 'Fetch Results'}
          </button>
        </div>
      </form>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {results.map((item) => (
          <div key={item.url} className="bg-white shadow-md rounded p-4">
            <img src={item.url} alt={item.anime_name || item.artist_name || 'Neko'} className="w-full h-48 object-cover mb-2 rounded" />
            {type === '1' ? (
              <>
                <p className="text-sm text-gray-600">Artist: <a href={item.artist_href} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{item.artist_name}</a></p>
                <p className="text-sm text-gray-600">Source: <a href={item.source_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{item.source_url}</a></p>
              </>
            ) : (
              <p className="text-sm text-gray-600">Anime: {item.anime_name}</p>
            )}
            <a
              href={item.url}
              download={`${selectedCategory}_${item.url.split('/').pop()}`}
              className="mt-2 inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-center w-full"
            >
              Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NekosBest;
