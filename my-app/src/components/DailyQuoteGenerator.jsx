import React, { useState, useEffect } from "react";

export default function DailyQuoteGenerator() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      console.log("Fetched quote:", data);
      setQuote(data);
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
    setLoading(false);
  };

  // Fetch quote on mount and every 30 seconds
  useEffect(() => {
    fetchQuote();
    const interval = setInterval(() => {
      fetchQuote();
    }, 30000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-lg text-center relative">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
          </div>
        ) : quote ? (
          <>
            <p className="text-xl font-semibold text-gray-800">"{quote.content}"</p>
            <p className="mt-4 text-gray-500">— {quote.author}</p>
          </>
        ) : (
          <p className="text-gray-500">No quote available.</p>
        )}

        <button
          onClick={fetchQuote}
          disabled={loading}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 transition"
        >
          Get New Quote
        </button>
      </div>
    </div>
  );
}
// This component fetches a random quote from the Quotable API and displays it.
// It updates the quote every 30 seconds and provides a button to fetch a new quote immediately