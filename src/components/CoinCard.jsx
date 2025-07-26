// Card that contains the fetch api data
const CoinCard = ({ coin }) => {
  const priceChangeClass =
    coin.price_change_percentage_24h && coin.price_change_percentage_24h < 0
      ? "text-red-500"
      : "text-green-500";

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center tansform transition duration-300 hover:scale-105 hover:shadow-xl">
      {/* coin image */}
      <img
        src={coin.image}
        alt={coin.name}
        className="w-16 h-16 mb-4 rounded-full"
      />
      {/* coin name */}
      <h2 className="text-xl font-semi-bold mb-1 text-center">{coin.name}</h2>
      {/* coin symbol */}
      <p className="text-gray-400 uppercase text-sm mb-3">{coin.symbol}</p>
      {/* current price */}
      <p className="text-3xl font-bold mb-3 text-blue-400">
        $
        {coin.current_price
          ? coin.current_price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          : "N/A"}
      </p>
      {/* 24-hour Price Change Percentage */}
      {coin.price_change_percentage_24h !== null && (
        <p className={`${priceChangeClass} text-lg font-medium`}>
          {coin.price_change_percentage_24h.toFixed(2)}% (24h)
        </p>
      )}
      {/* Market Cap Rank */}
      {coin.market_cap_rank && (
        <p className="text-gray-500 text-sm mt-2">
          Rank: #{coin.market_cap_rank}
        </p>
      )}
    </div>
  );
};
export default CoinCard;
