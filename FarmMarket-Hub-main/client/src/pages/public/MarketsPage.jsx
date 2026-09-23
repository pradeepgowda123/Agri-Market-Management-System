import { useEffect, useState } from "react";
import { getMarkets } from "../../services/publicMarketService";

const MarketsPage = () => {
  const [markets, setMarkets] = useState([]);
  const [filteredMarkets, setFilteredMarkets] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMarkets();
  }, []);

  useEffect(() => {
    const filtered = markets.filter(
      (market) =>
        market.marketName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        market.district
          .toLowerCase()
          .includes(search.toLowerCase())
    );

    setFilteredMarkets(filtered);
  }, [search, markets]);

  const fetchMarkets = async () => {
    try {
      const response = await getMarkets();

      setMarkets(response.data);
      setFilteredMarkets(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 text-xl">
        Loading Markets...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold text-green-700">
        Markets
      </h1>

      <p className="text-gray-600 mt-2 mb-8">
        Find agricultural markets across Karnataka.
      </p>

      <input
        type="text"
        placeholder="Search Market or District..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-lg px-4 py-3 w-full md:w-96 mb-8"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredMarkets.map((market) => (

          <div
            key={market._id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
          >

            <h2 className="text-2xl font-bold text-green-700">
              🏬 {market.marketName}
            </h2>

            <p className="mt-4">
              <strong>District:</strong> {market.district}
            </p>

            <p className="mt-2">
              <strong>Address:</strong> {market.address}
            </p>

            <p className="mt-2">
              <strong>Phone:</strong>{" "}
              {market.phoneNumber || "Not Available"}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
};

export default MarketsPage;