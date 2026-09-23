const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-green-700 to-green-500 text-white py-20">

      <div className="max-w-7xl mx-auto px-6">

        <div className="max-w-3xl">

          <h1 className="text-5xl font-bold leading-tight">
            🌾 FarmMarket Hub
          </h1>

          <p className="mt-5 text-xl text-green-100">
            Your Trusted Source for Daily Agricultural Market Prices
          </p>

          <p className="mt-4 text-lg text-green-50">
            Check today's vegetable prices, market information,
            and important announcements from agricultural markets.
          </p>

          <div className="mt-8 flex gap-4">

            <button className="bg-white text-green-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition">
              View Today's Prices
            </button>

          </div>

        </div>

      </div>

    </section>
  );
};

export default HeroSection;