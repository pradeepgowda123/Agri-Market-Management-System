import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getAllDailyPrices,
  createDailyPrice,
  updateDailyPrice,
  deleteDailyPrice,
} from "../../services/dailyPriceService";

import { getAllMarkets } from "../../services/marketService";
import { getAllVegetables } from "../../services/vegetableService";

import Card from "../../components/common/Card";
import PageHeader from "../../components/common/PageHeader";
import SearchBar from "../../components/common/SearchBar";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import DailyPriceForm from "../../components/dailyPrices/DailyPriceForm";

import {
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const DailyPricesPage = () => {
  const [dailyPrices, setDailyPrices] = useState([]);
  const [markets, setMarkets] = useState([]);
  const [vegetables, setVegetables] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [selectedPrice, setSelectedPrice] = useState(null);

  const [showDeleteDialog, setShowDeleteDialog] =
    useState(false);

  const [priceToDelete, setPriceToDelete] =
    useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [
        pricesRes,
        marketsRes,
        vegetablesRes,
      ] = await Promise.all([
        getAllDailyPrices(),
        getAllMarkets(),
        getAllVegetables(),
      ]);

      setDailyPrices(pricesRes.data);
      setMarkets(marketsRes.data);
      setVegetables(vegetablesRes.data);
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data) => {
    try {
      if (selectedPrice) {
        await updateDailyPrice(selectedPrice._id, data);

        toast.success("Daily price updated");
      } else {
        await createDailyPrice(data);

        toast.success("Daily price added");
      }

      setShowForm(false);
      setSelectedPrice(null);

      fetchData();

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDailyPrice(priceToDelete._id);

      toast.success("Deleted successfully");

      setShowDeleteDialog(false);

      fetchData();

    } catch (error) {
      toast.error("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        Loading...
      </div>
    );
  }
    return (
    <div className="min-h-screen bg-gray-100 p-6">

      <PageHeader
        title="💰 Daily Prices"
        subtitle="Manage daily vegetable prices."
        action={
          <button
            onClick={() => {
              setSelectedPrice(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            <FaPlus />
            Add Price
          </button>
        }
      />

      <Card className="mb-6">
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search market or vegetable..."
        />
      </Card>

      <Card className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-green-600 text-white">

            <tr>

              <th className="px-4 py-3 text-left">#</th>

              <th className="px-4 py-3 text-left">
                Market
              </th>

              <th className="px-4 py-3 text-left">
                Vegetable
              </th>

              <th className="px-4 py-3 text-center">
                Min
              </th>

              <th className="px-4 py-3 text-center">
                Modal
              </th>

              <th className="px-4 py-3 text-center">
                Max
              </th>

              <th className="px-4 py-3 text-center">
                Qty
              </th>

              <th className="px-4 py-3 text-center">
                Date
              </th>

              <th className="px-4 py-3 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {dailyPrices
              .filter((price) => {

                const market =
                  price.market?.marketName?.toLowerCase() || "";

                const vegetable =
                  price.vegetable?.name?.toLowerCase() || "";

                return (
                  market.includes(search.toLowerCase()) ||
                  vegetable.includes(search.toLowerCase())
                );

              })

              .map((price, index) => (

                <tr
                  key={price._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="px-4 py-3">
                    {index + 1}
                  </td>

                  <td className="px-4 py-3">
                    {price.market?.marketName}
                  </td>

                  <td className="px-4 py-3">
                    {price.vegetable?.name}
                  </td>

                  <td className="px-4 py-3 text-center">
                    ₹{price.minimumPrice}
                  </td>

                  <td className="px-4 py-3 text-center font-semibold text-green-700">
                    ₹{price.modalPrice}
                  </td>

                  <td className="px-4 py-3 text-center">
                    ₹{price.maximumPrice}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {price.arrivalQuantity} {price.unit}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {new Date(
                      price.priceDate
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3">

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() => {
                          setSelectedPrice(price);
                          setShowForm(true);
                        }}
                        className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                      >
                        <FaEdit />
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          setPriceToDelete(price);
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

        <DailyPriceForm
          dailyPrice={selectedPrice}
          markets={markets}
          vegetables={vegetables}
          onClose={() => {
            setShowForm(false);
            setSelectedPrice(null);
          }}
          onSave={handleSave}
        />

      )}

      {showDeleteDialog && (

        <ConfirmDialog
          title="Delete Daily Price"
          message={`Delete price of "${priceToDelete?.vegetable?.name}"?`}
          onCancel={() => {
            setShowDeleteDialog(false);
            setPriceToDelete(null);
          }}
          onConfirm={handleDelete}
        />

      )}

    </div>
  );
};

export default DailyPricesPage;