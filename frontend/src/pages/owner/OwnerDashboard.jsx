import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import StatsCard from "../../components/StatsCard";

import API from "../../api/axios";

import toast from "react-hot-toast";

function OwnerDashboard() {

  const [data, setData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const fetchDashboard =
    async () => {

      try {

        setLoading(true);

        const response =
          await API.get(
            "/stores/owner/dashboard"
          );

        console.log(response.data);

        setData(response.data);

      } catch (error) {

        console.log(error);

        toast.error(
          error.response?.data?.message ||
          "Failed to load owner dashboard"
        );

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (

    <DashboardLayout>

      <div>

        <h1 className="text-3xl font-bold text-white mb-8">
          Store Owner Dashboard
        </h1>

        {loading ? (

          <p className="text-gray-400">
            Loading dashboard...
          </p>

        ) : (

          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

              <StatsCard
                title="Total Stores"
                value={data?.totalStores || 0}
              />

              <StatsCard
                title="Total Ratings"
                value={data?.totalRatings || 0}
              />

              <StatsCard
                title="Average Rating"
                value={
                  data?.averageRating
                    ? Number(
                        data.averageRating
                      ).toFixed(1)
                    : 0
                }
              />

            </div>

            <div>

              <h2 className="text-2xl font-semibold text-white mb-6">
                My Stores
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {data?.stores?.map(
                  (store) => (

                    <div
                      key={store.id}
                      className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
                    >

                      <h3 className="text-xl font-semibold text-white">
                        {store.name}
                      </h3>

                      <p className="text-gray-400 mt-2 text-sm">
                        {store.address}
                      </p>

                      <p className="text-indigo-400 mt-4 text-sm">
                        {store.email}
                      </p>

                    </div>

                  )
                )}

              </div>

            </div>

          </>
        )}

      </div>

    </DashboardLayout>

  );

}

export default OwnerDashboard;