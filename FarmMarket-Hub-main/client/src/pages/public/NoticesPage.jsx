import { useEffect, useState } from "react";
import { getLatestNotices } from "../../services/publicNoticeService";

const NoticesPage = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await getLatestNotices();
      setNotices(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 text-xl">
        Loading Notices...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold text-green-700">
        Latest Notices
      </h1>

      <p className="text-gray-600 mt-2 mb-8">
        Stay updated with the latest announcements.
      </p>

      <div className="grid md:grid-cols-2 gap-6">

        {notices.map((notice) => (

          <div
            key={notice._id}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h2 className="text-2xl font-bold text-green-700">
              {notice.title}
            </h2>

            <p className="mt-4 text-gray-700">
              {notice.description}
            </p>

            <p className="mt-4 text-sm text-gray-500">
              Expires:{" "}
              {new Date(notice.expiryDate).toLocaleDateString()}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
};

export default NoticesPage;