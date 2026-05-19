import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import API from "../../api/axios";

import toast from "react-hot-toast";

import RatingModal from "../../components/RatingModal";

function Ratings() {
  const [stores, setStores] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedStore, setSelectedStore] =
    useState(null);

  const [showModal, setShowModal] =
    useState(false);

  const fetchRatings = async () => {
    try {
      setLoading(true);

      const { data } = await API.get(
        "/stores"
      );

      const storesData =
        Array.isArray(data)
          ? data
          : data.stores || [];

      console.log(storesData);

      setStores(storesData);
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to fetch ratings"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold text-white mb-8">
          My Ratings
        </h1>

        {loading ? (
          <p className="text-gray-400">
            Loading ratings...
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {stores.map((store) => (
              <div
                key={store.id}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-indigo-500 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      {store.name}
                    </h2>

                    <p className="text-gray-400 text-sm mt-2">
                      {store.address}
                    </p>
                  </div>

                  <div className="bg-yellow-500/10 text-yellow-400 px-3 py-1 rounded-lg text-sm font-semibold">
                    ⭐{" "}
                    {store.averageRating ||
                      store.rating ||
                      0}
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-sm text-gray-400">
                    Your Rating
                  </p>

                  <p className="text-yellow-400 text-xl font-bold mt-1">
                    ⭐{" "}
                    {store.userRating ||
                      "Not Rated"}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSelectedStore(store);
                    setShowModal(true);
                  }}
                  className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl transition"
                >
                  {store.userRating
                    ? "Update Rating"
                    : "Rate Store"}
                </button>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <RatingModal
            store={selectedStore}
            closeModal={() =>
              setShowModal(false)
            }
            refreshStores={fetchRatings}
          />
        )}
      </div>
    </DashboardLayout>
  );
}

export default Ratings;