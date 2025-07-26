import { useState, useEffect } from "react";
import CoinCard from "../src/components/CoinCard";
import "./App.css";

const App = () => {
  // setting up the variables and states
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // fetch coingecko gets the top 30 coins by market price in dollars
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false"
        );
        // checks if response is suucessful
        if (!response.ok) {
          // throws error if unsuccessful
          throw new Error(
            `HTTP error! Status: ${response.status} - ${response.statusText}`
          );
        }
        //parsing the json response
        const data = await response.json();
        setCoins(data);
      } catch (err) {
        //to catch any errors during the fetch operation
        console.error("Failed to load cryto. Please try again later", err);
        setError(
          err.message || "Failed to load crypto data. Please try again later."
        );
      } finally {
        setIsLoading(false); //end the loading
      }
    };
    fetchCoins();
  }, []); //ensures dependency array only runs once

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 font-inter">
      {/* Header Section */}
      <header className="text-center py-8">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
          Crypto Explorer
        </h1>
        <p className="text-lg text-gray-300">
          Explore real-time cryptocurrency prices and market data.
        </p>
      </header>
      {/* Conditional Rendering based on loading and error states */}
      <main className="container mx-auto px-4 py-8">
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-500"></div>
            <p className="ml-4 text-xl text-gray-400">
              Loading cryptocurrencies...
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-600 text-white p-4 rounded-lg text-center text-lg shadow-md">
            <p>{error}</p>
          </div>
        )}

        {/* Display coins if not loading and no error  */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {coins.map((coin) => (
              <CoinCard key={coin.id} coin={coin} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
