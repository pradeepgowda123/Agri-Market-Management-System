import { useEffect, useMemo, useState } from "react";
import { getLatestPrices } from "../../services/publicPriceService";

const PricesPage = () => {
  const [prices, setPrices] = useState([]);
  const [filteredPrices, setFilteredPrices] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedMarket, setSelectedMarket] = useState("");
  useEffect(() => {
    fetchPrices();
  }, []);

 useEffect(() => {
  let filtered = prices;

  if (search) {
    filtered = filtered.filter((price) =>
      price.vegetable?.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }

  if (selectedDistrict) {
    filtered = filtered.filter(
      (price) =>
        price.market?.district === selectedDistrict
    );
  }

  if (selectedMarket) {
    filtered = filtered.filter(
      (price) =>
        price.market?.marketName === selectedMarket
    );
  }

  setFilteredPrices(filtered);

}, [search, selectedDistrict, selectedMarket, prices]);

  const fetchPrices = async () => {
    try {
      const response = await getLatestPrices();

      setPrices(response.data);
      setFilteredPrices(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 text-xl">
        Loading Prices...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold text-green-700">
        Today's Market Prices
      </h1>

      <p className="text-gray-600 mt-2 mb-8">
        Live vegetable prices across markets.
      </p>

      <div className="grid md:grid-cols-3 gap-4 mb-8">

  <input
    type="text"
    placeholder="Search Vegetable..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="border rounded-lg px-4 py-3"
  />

  <select
    value={selectedDistrict}
    onChange={(e) => setSelectedDistrict(e.target.value)}
    className="border rounded-lg px-4 py-3"
  >
    <option value="">All Districts</option>

    {[...new Set(prices.map(
      p => p.market?.district
    ))].map((district) => (

      <option
        key={district}
        value={district}
      >
        {district}
      </option>

    ))}

  </select>

  <select
    value={selectedMarket}
    onChange={(e) => setSelectedMarket(e.target.value)}
    className="border rounded-lg px-4 py-3"
  >
    <option value="">All Markets</option>

    {[...new Set(prices.map(
      p => p.market?.marketName
    ))].map((market) => (

      <option
        key={market}
        value={market}
      >
        {market}
      </option>

    ))}

  </select>

</div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-green-600 text-white">

            <tr>
              <th className="px-4 py-3 text-left">Vegetable</th>
              <th className="px-4 py-3 text-left">Market</th>
              <th className="px-4 py-3 text-left">District</th>
              <th className="px-4 py-3 text-center">Min</th>
              <th className="px-4 py-3 text-center">Modal</th>
              <th className="px-4 py-3 text-center">Max</th>
              <th className="px-4 py-3 text-center">Arrival</th>
              <th className="px-4 py-3 text-center">Date</th>
            </tr>

          </thead>

          <tbody>

            {filteredPrices.map((price) => (

              <tr
                key={price._id}
                className="border-b hover:bg-gray-50"
              >

                <td className="px-4 py-4 font-medium">
                  {price.vegetable?.name}
                </td>

                <td className="px-4 py-4">
                  {price.market?.marketName}
                </td>

                <td className="px-4 py-4">
                  {price.market?.district}
                </td>

                <td className="px-4 py-4 text-center">
                  ₹{price.minimumPrice}
                </td>

                <td className="px-4 py-4 text-center font-bold text-green-700">
                  ₹{price.modalPrice}
                </td>

                <td className="px-4 py-4 text-center">
                  ₹{price.maximumPrice}
                </td>

                <td className="px-4 py-4 text-center">
                  {price.arrivalQuantity} {price.unit}
                </td>

                <td className="px-4 py-4 text-center">
                  {new Date(price.priceDate).toLocaleDateString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default PricesPage;