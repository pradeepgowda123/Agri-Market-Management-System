import { Outlet, NavLink } from "react-router-dom";
import sidebarMenu from "../constants/sidebarMenu";

import { useNavigate} from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminLayout = () => {
  const navigate = useNavigate();
const { logout, user } = useAuth();

const handleLogout = () => {
  logout();
  navigate("/login");
};
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-green-800 text-white p-5">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">
           Admin Panel
          </h2>

          <p className="text-sm mt-2">
          Welcome,
          </p>

          <p className="font-semibold">
            {user?.name}
          </p>
        </div>

        <ul className="space-y-3">
          {sidebarMenu.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block p-2 rounded ${
                    isActive
                      ? "bg-green-600"
                      : "hover:bg-green-700"
                  }`
                }
              >
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
        <button
          onClick={handleLogout}
          className="mt-8 w-full bg-red-600 hover:bg-red-700 p-2 rounded"
        >
          Logout
        </button>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;