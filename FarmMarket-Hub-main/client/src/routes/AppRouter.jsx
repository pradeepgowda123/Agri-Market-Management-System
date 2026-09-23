import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import AdminLayout from "../layouts/AdminLayout";

import HomePage from "../pages/public/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/admin/DashboardPage";
import ProtectedRoute from "./ProtectedRoute";
import VegetablesPage from "../pages/admin/VegetablesPage";
import MarketsPage from "../pages/admin/MarketsPage";
import DailyPricesPage from "../pages/admin/DailyPricesPage";
import NoticesPage from "../pages/admin/NoticesPage";
import PricesPage from "../pages/public/PricesPage";
import PublicMarketsPage from "../pages/public/MarketsPage";
import PublicNoticesPage from "../pages/public/NoticesPage";


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Layout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/prices" element={<PricesPage />} />
          <Route path="/markets" element={<PublicMarketsPage />} />
          <Route path="/notices" element={<PublicNoticesPage />} />
        </Route>

        {/* Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Admin Layout */}
        
<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  }
>
  <Route path="dashboard" element={<DashboardPage />} />
  <Route path="vegetables" element={<VegetablesPage />} />
  <Route path="markets" element={<MarketsPage />} />

   <Route
    path="daily-prices"
    element={<DailyPricesPage />}
  />

  <Route
  path="notices"
  element={<NoticesPage />}
/>
</Route>


      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;