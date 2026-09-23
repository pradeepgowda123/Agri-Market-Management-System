const MarketsSection = ({ markets = [] }) => {
  return (
    <section className="max-w-7xl mx-auto px-6 mt-12 mb-16">

      <h2 className="text-3xl font-bold mb-6">
        🏬 Available Markets
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        {markets.slice(0, 6).map((market) => (

          <div
            key={market._id}
            className="bg-white rounded-xl shadow p-6"
          >

            <h3 className="font-bold text-xl">
              {market.marketName}
            </h3>

            <p className="mt-3 text-gray-600">
              {market.district}
            </p>

            <p className="text-gray-500">
              {market.address}
            </p>

            <p className="mt-3 font-medium text-green-700">
              {market.phoneNumber || "No Contact"}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
};

export default MarketsSection;