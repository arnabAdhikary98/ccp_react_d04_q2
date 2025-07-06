# 🌟 Daily Quote Generator (Auto-refresh + Button)

## 🎯 Objective

Build a daily quote viewer that:

* Fetches a new quote every 30 seconds automatically using `useEffect`.
* Allows the user to fetch a new quote manually using a button.
* Displays the quote content and author.
* Shows a loading spinner while fetching a new quote.

---

## 💻 API Used

[Quotable API](https://api.quotable.io/random)

---

## ✅ Features

* **Auto-refresh**: Fetches a new quote every 30 seconds automatically.
* **Manual refresh**: Button to get a new quote anytime.
* **Loading animation**: Spinner shown while fetching.
* **Quote display**: Shows quote content and author.

---

## ⚛️ React Code Example

```jsx
import React, { useState, useEffect } from "react";

export default function DailyQuoteGenerator() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
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
```

---

## 💡 Explanation

* **useState**: Tracks `quote` data and `loading` state.
* **useEffect**: Runs once on mount to fetch the initial quote and sets up a 30-second interval to auto-refresh.
* **fetchQuote function**: Fetches a new quote from the API and updates state.
* **Loading Spinner**: Simple animated div using Tailwind CSS classes (`animate-spin`).
* **Cleanup**: Clears the interval when the component unmounts.

---

## 🎨 Styling

* Uses Tailwind CSS utility classes for quick and clean design.
* You can replace classes with your own CSS if not using Tailwind.

---

## ⚡ Bonus

* Add a fade-in animation when a new quote appears for smoother UX.
* You can also display a fallback message or error state if the API fails.

---

## ✅ Dependencies

* React
* Tailwind CSS (optional but recommended for this design)

---

## 🚀 Conclusion

You now have a fully functional, auto-refreshing, and interactive Daily Quote Generator! 🌟

Let me know if you'd also like a CodeSandbox link or additional enhancements! 💬
