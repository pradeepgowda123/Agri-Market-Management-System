import { useEffect, useState } from "react";
import { FaLeaf, FaStore, FaRupeeSign, FaBullhorn } from "react-icons/fa";

import { getDashboardStats } from "../../services/dashboardService";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  const [stats, setStats] = useState({
  vegetables: 0,
  markets: 0,
  prices: 0,
  notices: 0,
  recentPrices: [],
  recentNotices: [],
});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await getDashboardStats();

      setStats(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 text-xl">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold text-green-700 mb-2">
        Admin Dashboard
      </h1>

      <p className="text-gray-600 mb-8">
        Welcome to FarmMarket Hub Administration
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <FaLeaf className="text-green-600 text-4xl mb-4" />

          <h2 className="text-gray-500">
            Vegetables
          </h2>

          <p className="text-3xl font-bold">
            {stats.vegetables}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <FaStore className="text-blue-600 text-4xl mb-4" />

          <h2 className="text-gray-500">
            Markets
          </h2>

          <p className="text-3xl font-bold">
            {stats.markets}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <FaRupeeSign className="text-yellow-500 text-4xl mb-4" />

          <h2 className="text-gray-500">
            Daily Prices
          </h2>

          <p className="text-3xl font-bold">
            {stats.prices}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <FaBullhorn className="text-red-500 text-4xl mb-4" />

          <h2 className="text-gray-500">
            Notices
          </h2>

          <p className="text-3xl font-bold">
            {stats.notices}
          </p>

        </div>

        

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">

  {/* Recent Price Entries */}

  <div className="bg-white rounded-xl shadow p-6">

    <h2 className="text-2xl font-bold mb-5">
      Recent Daily Prices
    </h2>

    {stats.recentPrices.length === 0 ? (

      <p className="text-gray-500">
        No price entries found.
      </p>

    ) : (

      <div className="space-y-4">

        {stats.recentPrices.map((price) => (

          <div
            key={price._id}
            className="border-b pb-3"
          >

            <h3 className="font-semibold">
              {price.vegetable?.name}
            </h3>

            <p className="text-sm text-gray-600">
              {price.market?.marketName}
            </p>

            <p className="text-green-700 font-bold">
              ₹{price.modalPrice}
            </p>

          </div>

        ))}

      </div>

    )}

  </div>

  {/* Recent Notices */}

  <div className="bg-white rounded-xl shadow p-6">

    <h2 className="text-2xl font-bold mb-5">
      Latest Notices
    </h2>

    {stats.recentNotices.length === 0 ? (

      <p className="text-gray-500">
        No notices available.
      </p>

    ) : (

      <div className="space-y-4">

        {stats.recentNotices.map((notice) => (

          <div
            key={notice._id}
            className="border-b pb-3"
          >

            <h3 className="font-semibold">
              {notice.title}
            </h3>

            <p className="text-sm text-gray-600">
              {notice.description}
            </p>

          </div>

        ))}

      </div>

    )}

  </div>

</div>

<div className="bg-white rounded-xl shadow p-6 mt-10">

  <h2 className="text-2xl font-bold mb-6">
    Quick Actions
  </h2>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

    <Link
      to="/admin/vegetables"
      className="bg-green-600 hover:bg-green-700 text-white rounded-lg p-4 text-center font-semibold"
    >
      ➕ Add Vegetable
    </Link>

    <Link
      to="/admin/markets"
      className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-4 text-center font-semibold"
    >
      ➕ Add Market
    </Link>

    <Link
      to="/admin/daily-prices"
      className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg p-4 text-center font-semibold"
    >
      ➕ Add Daily Price
    </Link>

    <Link
      to="/admin/notices"
      className="bg-red-600 hover:bg-red-700 text-white rounded-lg p-4 text-center font-semibold"
    >
      ➕ Add Notice
    </Link>

  </div>

</div>

    </div>
  );
};

export default DashboardPage;