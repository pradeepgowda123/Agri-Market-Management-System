import { useState } from "react";

const VegetableForm = ({ vegetable, onClose, onSave }) => {
  const [name, setName] = useState(vegetable?.name || "");
const [isActive, setIsActive] = useState(
  vegetable?.isActive ?? true
);
  const handleSubmit = (e) => {
  e.preventDefault();

  onSave({
    name,
    isActive,
  });
};
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4">
  {vegetable ? "Edit Vegetable" : "Add Vegetable"}
</h2>

        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Name
          </label>

          <input
            type="text"
            className="border p-2 rounded w-full mb-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className="block mb-2">
            Status
          </label>

          <select
            className="border p-2 rounded w-full mb-6"
            value={isActive}
            onChange={(e) =>
              setIsActive(e.target.value === "true")
            }
          >
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-green-700 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VegetableForm;