import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Stores from "../pages/user/Stores";
import Dashboard from "../pages/dashboard/Dashboard";
import Ratings from "../pages/user/Ratings";
import Users from "../pages/admin/Users";
import ProtectedRoute from "../components/ProtectedRoute";
import OwnerDashboard from "../pages/owner/OwnerDashboard";
import AdminStores from "../pages/admin/Stores";
import CreateStore from "../pages/admin/CreateStore";
import CreateUser from "../pages/admin/CreateUser";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/login" />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
  path="/stores"
  element={
    <ProtectedRoute>
      <Stores />
    </ProtectedRoute>
  }
/>
<Route
  path="/ratings"
  element={
    <ProtectedRoute>
      <Ratings />
    </ProtectedRoute>
  }
/>
<Route
  path="/users"
  element={
    <ProtectedRoute
      allowedRoles={["Admin"]}
    >
      <Users />
    </ProtectedRoute>
  }
/>
<Route
  path="/owner"
  element={
    <ProtectedRoute
      allowedRoles={[
        "StoreOwner",
        "storeOwner"
      ]}
    >
      <OwnerDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/stores"
  element={
    <ProtectedRoute
      allowedRoles={["Admin"]}
    >
      <AdminStores />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/create-store"
  element={
    <ProtectedRoute
      allowedRoles={["Admin"]}
    >
      <CreateStore />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/create-user"
  element={
    <ProtectedRoute
      allowedRoles={["Admin"]}
    >
      <CreateUser />
    </ProtectedRoute>
  }
/>
    </Routes>
  );
}

export default AppRoutes;