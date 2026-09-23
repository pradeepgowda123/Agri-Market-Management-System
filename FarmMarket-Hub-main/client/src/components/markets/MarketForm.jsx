import { useEffect, useState } from "react";

const MarketForm = ({
  market,
  onClose,
  onSave,
}) => {

  const [formData, setFormData] = useState({
    marketName: "",
    district: "",
    address: "",
    phoneNumber: "",
  });

  useEffect(() => {

    if (market) {
      setFormData({
        marketName: market.marketName,
        district: market.district,
        address: market.address,
        phoneNumber: market.phoneNumber,
      });
    }

  }, [market]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-[500px] p-6">

        <h2 className="text-2xl font-bold mb-6">

          {market ? "Edit Market" : "Add Market"}

        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="marketName"
            placeholder="Market Name"
            value={formData.marketName}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="text"
            name="district"
            placeholder="District"
            value={formData.district}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            rows={3}
            required
          />

          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-5 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
            >
              Save
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default MarketForm;