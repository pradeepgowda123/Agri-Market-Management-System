import { useEffect, useState } from "react";
import {
  getAllVegetables,
  createVegetable,
  updateVegetable,
} from "../../services/vegetableService";
import VegetableForm from "../../components/vegetables/VegetableForm";
import toast from "react-hot-toast";
import StatusBadge from "../../components/common/StatusBadge";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Card from "../../components/common/Card";
import PageHeader from "../../components/common/PageHeader";
import SearchBar from "../../components/common/SearchBar";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { deleteVegetable } from "../../services/vegetableService";


const VegetablesPage = () => {
  const [vegetables, setVegetables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedVegetable, setSelectedVegetable] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [vegetableToDelete, setVegetableToDelete] = useState(null);

  useEffect(() => {
    fetchVegetables();
  }, []);

  const fetchVegetables = async () => {
    try {
      const response = await getAllVegetables();
      setVegetables(response.data);
    } catch (error) {
      console.error("Error fetching vegetables:", error);
    } finally {
      setLoading(false);
    }
  };

const handleSaveVegetable = async (vegetableData) => {
  try {
    if (selectedVegetable) {
      await updateVegetable(selectedVegetable._id, vegetableData);

      toast.success("Vegetable updated successfully");
    } else {
      await createVegetable(vegetableData);

      toast.success("Vegetable added successfully");
    }

    setShowForm(false);
    setSelectedVegetable(null);

    fetchVegetables();
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Something went wrong"
    );
  }
};

const handleDeleteVegetable = async () => {
  try {
    await deleteVegetable(vegetableToDelete._id);

    toast.success("Vegetable deleted successfully");

    setShowDeleteDialog(false);
    setVegetableToDelete(null);

    fetchVegetables();
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Failed to delete vegetable"
    );
  }
};

  if (loading) {
  return (
    <div className="flex justify-center items-center h-96">
      <div className="text-lg font-semibold text-green-600">
        Loading vegetables...
      </div>
    </div>
  );
}

 return (
  <div className="min-h-screen bg-gray-100 p-6">

    <PageHeader
      title="🥬 Vegetables"
      subtitle="Manage all vegetables available in the market."
      action={
        <button
          onClick={() => {
            setSelectedVegetable(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow transition"
        >
          <FaPlus />
          Add Vegetable
        </button>
      }
    />

    <Card className="mb-6">
      <SearchBar
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search vegetables..."
      />
    </Card>

    <Card className="overflow-hidden">

      <table className="w-full">

        <thead className="bg-green-600 text-white">
          <tr>
            <th className="px-6 py-4 text-left">#</th>
            <th className="px-6 py-4 text-left">Vegetable</th>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>

          {vegetables
            .filter((vegetable) =>
              vegetable.name
                .toLowerCase()
                .includes(search.toLowerCase())
            )
            .map((vegetable, index) => (

              <tr
                key={vegetable._id}
                className="border-b hover:bg-gray-50 transition"
              >

                <td className="px-6 py-4">
                  {index + 1}
                </td>

                <td className="px-6 py-4 font-medium text-gray-700">
                  {vegetable.name}
                </td>

                <td className="px-6 py-4">
                  <StatusBadge active={vegetable.isActive} />
                </td>

                <td className="px-6 py-4">

                  <div className="flex justify-center gap-3">

                    <button
                      onClick={() => {
                        setSelectedVegetable(vegetable);
                        setShowForm(true);
                      }}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition"
                    >
                      <FaEdit />
                      Edit
                    </button>

                    <button
  onClick={() => {
    setVegetableToDelete(vegetable);
    setShowDeleteDialog(true);
  }}
  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition"
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
      <VegetableForm
        vegetable={selectedVegetable}
        onClose={() => {
          setShowForm(false);
          setSelectedVegetable(null);
        }}
        onSave={handleSaveVegetable}
      />
    )}
    {showDeleteDialog && (
  <ConfirmDialog
    title="Delete Vegetable"
    message={`Are you sure you want to delete "${vegetableToDelete?.name}"?`}
    onCancel={() => {
      setShowDeleteDialog(false);
      setVegetableToDelete(null);
    }}
    onConfirm={handleDeleteVegetable}
  />
)}
  </div>
);
};

export default VegetablesPage;