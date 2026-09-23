import { useEffect, useState } from "react";

const NoticeForm = ({ notice, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    expiryDate: "",
  });

  useEffect(() => {
    if (notice) {
      setFormData({
        title: notice.title,
        description: notice.description,
        priority: notice.priority,
        expiryDate: notice.expiryDate?.substring(0, 10),
      });
    }
  }, [notice]);

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
      <div className="bg-white w-[600px] rounded-xl shadow-xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          {notice ? "Edit Notice" : "Add Notice"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block mb-2 font-medium">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="border rounded w-full p-2"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              rows="5"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="border rounded w-full p-2 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block mb-2 font-medium">
                Priority
              </label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="border rounded w-full p-2"
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Expiry Date
              </label>

              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                required
                className="border rounded w-full p-2"
              />
            </div>

          </div>

          <div className="flex justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="border px-5 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
            >
              Save
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default NoticeForm;