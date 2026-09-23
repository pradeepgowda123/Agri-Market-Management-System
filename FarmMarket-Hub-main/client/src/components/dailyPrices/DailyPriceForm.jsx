import { useEffect, useState } from "react";

const DailyPriceForm = ({
  dailyPrice,
  markets,
  vegetables,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    market: "",
    vegetable: "",
    minimumPrice: "",
    modalPrice: "",
    maximumPrice: "",
    arrivalQuantity: "",
    unit: "Quintal",
    priceDate: "",
  });

  useEffect(() => {
    if (dailyPrice) {
      setFormData({
        market: dailyPrice.market?._id || dailyPrice.market,
        vegetable: dailyPrice.vegetable?._id || dailyPrice.vegetable,
        minimumPrice: dailyPrice.minimumPrice,
        modalPrice: dailyPrice.modalPrice,
        maximumPrice: dailyPrice.maximumPrice,
        arrivalQuantity: dailyPrice.arrivalQuantity,
        unit: dailyPrice.unit,
        priceDate: dailyPrice.priceDate?.substring(0, 10),
      });
    }
  }, [dailyPrice]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl w-[700px] p-6 shadow-xl">

        <h2 className="text-2xl font-bold mb-6">
          {dailyPrice ? "Edit Daily Price" : "Add Daily Price"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-4"
        >

          <div>
            <label className="block mb-2 font-medium">
              Market
            </label>

            <select
              name="market"
              value={formData.market}
              onChange={handleChange}
              required
              className="border rounded w-full p-2"
            >
              <option value="">Select Market</option>

              {markets.map((market) => (
                <option
                  key={market._id}
                  value={market._id}
                >
                  {market.marketName} ({market.district})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Vegetable
            </label>

            <select
              name="vegetable"
              value={formData.vegetable}
              onChange={handleChange}
              required
              className="border rounded w-full p-2"
            >
              <option value="">Select Vegetable</option>

              {vegetables.map((veg) => (
                <option
                  key={veg._id}
                  value={veg._id}
                >
                  {veg.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2">Minimum Price</label>

            <input
              type="number"
              name="minimumPrice"
              value={formData.minimumPrice}
              onChange={handleChange}
              required
              className="border rounded w-full p-2"
            />
          </div>

          <div>
            <label className="block mb-2">Modal Price</label>

            <input
              type="number"
              name="modalPrice"
              value={formData.modalPrice}
              onChange={handleChange}
              required
              className="border rounded w-full p-2"
            />
          </div>

          <div>
            <label className="block mb-2">Maximum Price</label>

            <input
              type="number"
              name="maximumPrice"
              value={formData.maximumPrice}
              onChange={handleChange}
              required
              className="border rounded w-full p-2"
            />
          </div>

          <div>
            <label className="block mb-2">Arrival Quantity</label>

            <input
              type="number"
              name="arrivalQuantity"
              value={formData.arrivalQuantity}
              onChange={handleChange}
              required
              className="border rounded w-full p-2"
            />
          </div>

          <div>
            <label className="block mb-2">Unit</label>

            <select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="border rounded w-full p-2"
            >
              <option>Quintal</option>
              <option>Kg</option>
              <option>Ton</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Price Date</label>

            <input
              type="date"
              name="priceDate"
              value={formData.priceDate}
              onChange={handleChange}
              required
              className="border rounded w-full p-2"
            />
          </div>

          <div className="col-span-2 flex justify-end gap-3 mt-4">

            <button
              type="button"
              onClick={onClose}
              className="border px-5 py-2 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
            >
              Save
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default DailyPriceForm;