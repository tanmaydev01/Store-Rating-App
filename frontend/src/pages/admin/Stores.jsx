import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import API from "../../api/axios";

import toast from "react-hot-toast";

import RatingModal from "../../components/RatingModal";

import { useAuth } from "../../context/AuthContext";

function Stores() {

  const { user } = useAuth();

  const [stores, setStores] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [selectedStore, setSelectedStore] =
    useState(null);

  const [showModal, setShowModal] =
    useState(false);

  const fetchStores = async () => {

    try {

      setLoading(true);

      const { data } =
        await API.get("/stores");

      const storesData =
        data.stores || [];

      const filteredStores =
        storesData.filter(
          (store) => {

            const query =
              search.toLowerCase();

            return (

              store.name
                ?.toLowerCase()
                .includes(query) ||

              store.address
                ?.toLowerCase()
                .includes(query)

            );

          }
        );

      setStores(filteredStores);

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to fetch stores"
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchStores();
  }, [search]);

  return (

    <DashboardLayout>

      <div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">

          <h1 className="text-3xl font-bold text-white">
            Stores
          </h1>

          <input
            type="text"
            placeholder="Search stores..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white outline-none w-full md:w-[300px]"
          />

        </div>

        {loading ? (

          <p className="text-gray-400">
            Loading stores...
          </p>

        ) : stores.length === 0 ? (

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-gray-400">
            No stores found
          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {stores.map((store) => (

              <div
                key={store.id}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-indigo-500 transition"
              >

                <div className="flex items-start justify-between">

                  <div>

                    <h2 className="text-xl font-semibold text-white">
                      {store.name}
                    </h2>

                    <p className="text-gray-400 text-sm mt-2">
                      {store.address}
                    </p>

                    <p className="text-indigo-400 text-sm mt-3">
                      {store.email}
                    </p>

                  </div>

                  <div className="bg-yellow-500/10 text-yellow-400 px-3 py-1 rounded-lg text-sm font-semibold">
                    ⭐{" "}
                    {store.averageRating
                      ? Number(
                          store.averageRating
                        ).toFixed(1)
                      : 0}
                  </div>

                </div>

                {user?.role === "User" && (

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

                )}

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
            refreshStores={fetchStores}
          />

        )}

      </div>

    </DashboardLayout>

  );

}

export default Stores;