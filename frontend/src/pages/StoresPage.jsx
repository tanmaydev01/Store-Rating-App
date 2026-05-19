import { useEffect, useState } from "react";
import api from "../services/api";
import StoreCard from "../components/StoreCard";

function StoresPage() {

  const [stores, setStores] = useState([]);

  const [search, setSearch] = useState("");

  const [ratingData, setRatingData] = useState({});

  const [loading, setLoading] = useState(false);

  const [snack, setSnack] = useState(null);

  const [submittingMap, setSubmittingMap] = useState({});

  const fetchStores = async (searchText = "") => {
    setLoading(true);
    try {
      const response = await api.get(`/stores?name=${encodeURIComponent(searchText)}`);
      setStores(response.data.stores || []);
    } catch (error) {
      console.error(error);
      setSnack({ type: 'error', message: error.response?.data?.message || "Failed to load stores" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // debounce search
  useEffect(() => {
    const t = setTimeout(() => fetchStores(search), 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleSearch = (e) => setSearch(e.target.value);

  const submitRating = async (storeId, rating) => {
    if (!rating || rating < 1 || rating > 5) {
      setSnack({ open: true, message: "Please choose a rating between 1 and 5", severity: "warning" });
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setSnack({ open: true, message: "You must be logged in to rate", severity: "warning" });
      return;
    }

    setSubmittingMap((m) => ({ ...m, [storeId]: true }));

    try {
      await api.post(
        "/ratings",
        { storeId, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSnack({ open: true, message: "Rating submitted", severity: "success" });
      // refresh list to show updated averages
      fetchStores(search);
    } catch (error) {
      setSnack({ open: true, message: error.response?.data?.message || "Rating failed", severity: "error" });
    } finally {
      setSubmittingMap((m) => ({ ...m, [storeId]: false }));
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Stores</h1>

      <div className="mb-6">
        <div className="rounded-lg p-8 mb-4 text-white" style={{ background: 'linear-gradient(90deg,var(--brand-500),var(--brand-400))' }}>
          <h2 className="text-2xl font-bold">Discover top local stores</h2>
          <p className="mt-1 opacity-90">Browse stores, read ratings, and share your own experience.</p>
        </div>

        <div>
          <input value={search} onChange={handleSearch} placeholder="Search stores by name or address" className="w-full border border-gray-200 rounded-md px-3 py-2" />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stores.length === 0 ? (
            <div className="col-span-full text-gray-500">No stores found.</div>
          ) : (
            stores.map((store) => (
              <div key={store.id}>
                <StoreCard
                  store={store}
                  ratingValue={ratingData[store.id]}
                  onRate={(v) => setRatingData((s) => ({ ...s, [store.id]: v }))}
                  onSubmit={() => submitRating(store.id, Number(ratingData[store.id]))}
                  submitting={!!submittingMap[store.id]}
                  disabled={!localStorage.getItem("token")}
                />
              </div>
            ))
          )}
        </div>
      )}

      {snack ? (
        <div className={`mt-4 p-3 rounded ${snack.type === 'success' ? 'bg-green-50 text-green-800' : snack.type === 'error' ? 'bg-red-50 text-red-800' : 'bg-yellow-50 text-yellow-800'}`}>
          {snack.message}
        </div>
      ) : null}
    </div>
  );
}

export default StoresPage;