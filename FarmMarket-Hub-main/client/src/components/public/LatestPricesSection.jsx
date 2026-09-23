const LatestPricesSection = ({ prices = [] }) => {
  return (
    <section className="max-w-7xl mx-auto px-6 mt-12">

      <h2 className="text-3xl font-bold mb-6">
        💰 Latest Market Prices
      </h2>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-green-600 text-white">

            <tr>
              <th className="px-5 py-3 text-left">Market</th>
              <th className="px-5 py-3 text-left">Vegetable</th>
              <th className="px-5 py-3 text-center">Modal Price</th>
              <th className="px-5 py-3 text-center">Date</th>
            </tr>

          </thead>

          <tbody>

            {prices.slice(0, 5).map((price) => (

              <tr
                key={price._id}
                className="border-b hover:bg-gray-50"
              >

                <td className="px-5 py-4">
                  {price.market?.marketName}
                </td>

                <td className="px-5 py-4">
                  {price.vegetable?.name}
                </td>

                <td className="px-5 py-4 text-center font-semibold text-green-700">
                  ₹{price.modalPrice}
                </td>

                <td className="px-5 py-4 text-center">
                  {new Date(price.priceDate).toLocaleDateString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </section>
  );
};

export default LatestPricesSection;