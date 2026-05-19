import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import StatsCard from "../../components/StatsCard";

import API from "../../api/axios";

import toast from "react-hot-toast";

import { FiShoppingBag, FiUsers, FiStar } from "react-icons/fi";

function Dashboard() {

  const [stats, setStats] =
    useState({
      totalStores: 0,
      totalUsers: 0,
      totalRatings: 0,
    });

  const [loading, setLoading] =
    useState(true);

  const fetchDashboardData =
    async () => {

      try {

        setLoading(true);

        const storesResponse =
          await API.get("/stores");

        const usersResponse =
          await API.get("/users");

        const stores =
          storesResponse.data.stores || [];

        const users =
          usersResponse.data.users || [];

        let totalRatings = 0;

        stores.forEach((store) => {

          if (store.averageRating) {
            totalRatings++;
          }

        });

        setStats({
          totalStores:
            stores.length,

          totalUsers:
            users.length,

          totalRatings,
        });

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to load dashboard"
        );

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (

    <DashboardLayout>

      <div className="space-y-8 animate-fade-in">

        <div>
          <h1 className="section-title text-4xl mb-2">
            Welcome Back 👋
          </h1>
          <p className="text-slate-400">Here's what's happening with your store ratings today</p>
        </div>

        {loading ? (

          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-slate-700 border-t-primary-600 rounded-full animate-spin"></div>
              <p className="text-slate-400">Loading dashboard...</p>
            </div>
          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-in">

            <StatsCard
              title="Total Stores"
              value={stats.totalStores}
              icon={FiShoppingBag}
              color="primary"
            />

            <StatsCard
              title="Total Users"
              value={stats.totalUsers}
              icon={FiUsers}
              color="secondary"
            />

            <StatsCard
              title="Rated Stores"
              value={stats.totalRatings}
              icon={FiStar}
              color="emerald"
            />

          </div>

        )}

      </div>

    </DashboardLayout>

  );

}

export default Dashboard;