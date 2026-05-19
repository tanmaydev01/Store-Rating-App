import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import API from "../../api/axios";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

import { FiArrowLeft } from "react-icons/fi";

function CreateStore() {

  const navigate = useNavigate();

  const [owners, setOwners] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      address: "",
      ownerId: "",
    });

  const fetchOwners = async () => {

    try {

      const { data } =
        await API.get("/users");

      const users =
        data.users || [];

      const owners =
        users.filter(
          (user) =>
            user.role ===
            "StoreOwner"
        );

      setOwners(owners);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {
    fetchOwners();
  }, []);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        await API.post(
          "/stores",
          formData
        );

        toast.success(
          "Store created successfully"
        );

        navigate("/admin/stores");

      } catch (error) {

        console.log(error);

        toast.error(
          error.response?.data
            ?.message ||
          "Failed to create store"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <DashboardLayout>

      <div className="max-w-2xl mx-auto animate-fade-in">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <FiArrowLeft /> Back
        </button>

        <div className="mb-8">
          <h1 className="section-title text-4xl mb-2">
            Create Store
          </h1>
          <p className="text-slate-400">Add a new store to your system</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="card-base p-8 space-y-6"
        >

          <div>
            <label className="block text-slate-300 font-semibold mb-2">Store Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter store name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input-base w-full"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-2">Store Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter store email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-base w-full"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-2">Store Address</label>
            <textarea
              name="address"
              rows="4"
              placeholder="Enter store address"
              value={formData.address}
              onChange={handleChange}
              required
              className="input-base w-full resize-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-2">Select Store Owner</label>
            <select
              name="ownerId"
              value={formData.ownerId}
              onChange={handleChange}
              required
              className="input-base w-full"
            >

              <option value="">
                Choose an owner...
              </option>

              {owners.map((owner) => (

                <option
                  key={owner.id}
                  value={owner.id}
                >
                  {owner.name} ({owner.email})
                </option>

              ))}

            </select>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn-outlined flex-1"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 disabled:opacity-50"
            >
              {loading
                ? "Creating..."
                : "Create Store"}
            </button>
          </div>

        </form>

      </div>

    </DashboardLayout>

  );

}

export default CreateStore;