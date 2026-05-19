import { useState } from "react";

import { FiStar, FiX } from "react-icons/fi";

import toast from "react-hot-toast";

import API from "../api/axios";

function RatingModal({
  store,
  closeModal,
  refreshStores,
}) {
  const [rating, setRating] =
    useState(store.userRating || 0);

  const [hover, setHover] =
    useState(0);

  const [loading, setLoading] =
    useState(false);

  const submitRating = async () => {
    if (!rating) {
      toast.error(
        "Please select a rating"
      );

      return;
    }

    try {
      setLoading(true);

      if (store.userRating) {
        await API.put("/ratings", {
          storeId: store.id,
          rating,
        });

        toast.success(
          "Rating updated successfully"
        );
      } else {
        await API.post("/ratings", {
          storeId: store.id,
          rating,
        });

        toast.success(
          "Rating submitted successfully"
        );
      }

      refreshStores();

      closeModal();
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Failed to submit rating"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteRating = async () => {
    try {
      setLoading(true);

      await API.delete(
        `/ratings/${store.id}`
      );

      toast.success(
        "Rating deleted successfully"
      );

      refreshStores();

      closeModal();
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Failed to delete rating"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-fade-in">
      <div className="w-full max-w-md card-base bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 border-slate-700/50 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title text-2xl">
            {store.userRating
              ? "Update Rating"
              : "Rate Store"}
          </h2>

          <button
            onClick={closeModal}
            className="text-slate-400 hover:text-white hover:bg-slate-700/30 rounded-lg p-2 transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="mb-8 pb-6 border-b border-slate-700/50">
          <h3 className="text-white text-lg font-semibold">
            {store.name}
          </h3>

          <p className="text-slate-400 text-sm mt-2">
            {store.address}
          </p>
        </div>

        <div className="mb-8">
          <p className="text-slate-400 text-sm mb-4 font-medium">Select your rating</p>
          <div className="flex items-center gap-4">
            {[1, 2, 3, 4, 5].map(
              (star) => (
                <button
                  key={star}
                  onClick={() =>
                    setRating(star)
                  }
                  onMouseEnter={() =>
                    setHover(star)
                  }
                  onMouseLeave={() =>
                    setHover(0)
                  }
                  className="transition-all duration-200 hover:scale-110"
                >
                  <FiStar
                    size={40}
                    className={`${
                      star <=
                      (hover || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-slate-600"
                    }`}
                  />
                </button>
              )
            )}
          </div>
        </div>

        {store.userRating && (
          <div className="mb-6 p-4 bg-primary-600/15 border border-primary-600/40 rounded-lg">
            <p className="text-sm text-slate-300">
              Current Rating
            </p>

            <p className="text-yellow-400 font-bold text-lg mt-2">
              ⭐ {store.userRating}
            </p>
          </div>
        )}

        <div className="flex gap-3 pt-4">
          {store.userRating && (
            <button
              onClick={deleteRating}
              disabled={loading}
              className="btn-outlined flex-1 border-red-500/50 text-red-400 hover:bg-red-500/10"
            >
              Delete
            </button>
          )}

          <button
            onClick={closeModal}
            className="btn-outlined flex-1"
          >
            Cancel
          </button>

          <button
            onClick={submitRating}
            disabled={loading}
            className="btn-primary flex-1"
          >
            {loading
              ? "Saving..."
              : store.userRating
              ? "Update"
              : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RatingModal;