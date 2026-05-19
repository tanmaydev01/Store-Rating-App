import {
  FiHome,
  FiShoppingBag,
  FiUsers,
  FiStar,
  FiLogOut,
} from "react-icons/fi";

import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Sidebar() {

  const { logout, user } =
    useAuth();

  return (

    <div className="w-[260px] min-h-screen bg-gray-900 border-r border-gray-800 p-5">

      <h1 className="text-white text-2xl font-bold mb-10">
        Store Rating
      </h1>

      <div className="flex flex-col gap-3">

        <Link
          to={
            user?.role === "StoreOwner"
              ? "/owner"
              : "/dashboard"
          }
          className="flex items-center gap-3 text-gray-300 hover:bg-gray-800 px-4 py-3 rounded-xl transition"
        >
          <FiHome />
          Dashboard
        </Link>

        <Link
          to={
            user?.role === "Admin"
              ? "/admin/stores"
              : "/stores"
          }
          className="flex items-center gap-3 text-gray-300 hover:bg-gray-800 px-4 py-3 rounded-xl transition"
        >
          <FiShoppingBag />
          Stores
        </Link>

        {user?.role === "User" && (

          <Link
            to="/ratings"
            className="flex items-center gap-3 text-gray-300 hover:bg-gray-800 px-4 py-3 rounded-xl transition"
          >
            <FiStar />
            Ratings
          </Link>

        )}

        {user?.role === "Admin" && (

          <Link
            to="/users"
            className="flex items-center gap-3 text-gray-300 hover:bg-gray-800 px-4 py-3 rounded-xl transition"
          >
            <FiUsers />
            Users
          </Link>

        )}

        <button
          onClick={logout}
          className="flex items-center gap-3 text-red-400 hover:bg-red-500/10 px-4 py-3 rounded-xl mt-5 transition"
        >
          <FiLogOut />
          Logout
        </button>

      </div>

    </div>

  );

}

export default Sidebar;