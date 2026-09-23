import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { deleteMarket } from "../../services/marketService";
import {
  getAllMarkets,
  createMarket,
  updateMarket,
} from "../../services/marketService";

import Card from "../../components/common/Card";
import PageHeader from "../../components/common/PageHeader";
import SearchBar from "../../components/common/SearchBar";
import StatusBadge from "../../components/common/StatusBadge";
import MarketForm from "../../components/markets/MarketForm";

import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const MarketsPage = () => {
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState(null);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [marketToDelete, setMarketToDelete] = useState(null);

  useEffect(() => {
    fetchMarkets();
  }, []);

  const fetchMarkets = async () => {
    try {
      const response = await getAllMarkets();
      setMarkets(response.data);
    } catch (error) {
      toast.error("Failed to load markets");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveMarket = async (marketData) => {
    try {
      if (selectedMarket) {
        await updateMarket(selectedMarket._id, marketData);
        toast.success("Market updated successfully");
      } else {
        await createMarket(marketData);
        toast.success("Market added successfully");
      }

      setShowForm(false);
      setSelectedMarket(null);

      fetchMarkets();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleDeleteMarket = async () => {
  try {
    await deleteMarket(marketToDelete._id);

    toast.success("Market deleted successfully");

    setShowDeleteDialog(false);
    setMarketToDelete(null);

    fetchMarkets();
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Failed to delete market"
    );
  }
};

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        Loading markets...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <PageHeader
        title="🏬 Markets"
        subtitle="Manage all agricultural markets."
        action={
          <button
            onClick={() => {
              setSelectedMarket(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            <FaPlus />
            Add Market
          </button>
        }
      />

      <Card className="mb-6">
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by market or district..."
        />
      </Card>

      <Card className="overflow-hidden">

        <table className="w-full">

          <thead className="bg-green-600 text-white">

            <tr>
              <th className="px-6 py-4 text-left">#</th>
              <th className="px-6 py-4 text-left">Market</th>
              <th className="px-6 py-4 text-left">District</th>
              <th className="px-6 py-4 text-left">Phone</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {markets
              .filter(
                (market) =>
                  market.marketName
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  market.district
                    .toLowerCase()
                    .includes(search.toLowerCase())
              )
              .map((market, index) => (
                <tr
                  key={market._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{index + 1}</td>

                  <td className="px-6 py-4 font-medium">
                    {market.marketName}
                  </td>

                  <td className="px-6 py-4">
                    {market.district}
                  </td>

                  <td className="px-6 py-4">
                    {market.phoneNumber || "-"}
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge active={market.isActive} />
                  </td>

                  <td className="px-6 py-4">

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() => {
                          setSelectedMarket(market);
                          setShowForm(true);
                        }}
                        className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                      >
                        <FaEdit />
                        Edit
                      </button>

                      <button
  onClick={() => {
    setMarketToDelete(market);
    setShowDeleteDialog(true);
  }}
  className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2"
>
  <FaTrash />
  Delete
</button>

                    </div>

                  </td>

                </tr>
              ))}

          </tbody>

        </table>

      </Card>

      {showForm && (
        <MarketForm
          market={selectedMarket}
          onClose={() => {
            setShowForm(false);
            setSelectedMarket(null);
          }}
          onSave={handleSaveMarket}
        />
      )}

      {showDeleteDialog && (
  <ConfirmDialog
    title="Delete Market"
    message={`Are you sure you want to delete "${marketToDelete?.marketName}"?`}
    onCancel={() => {
      setShowDeleteDialog(false);
      setMarketToDelete(null);
    }}
    onConfirm={handleDeleteMarket}
  />
)}
    </div>
  );
};

export default MarketsPage;