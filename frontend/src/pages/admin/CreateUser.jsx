import { useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import API from "../../api/axios";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

import { FiArrowLeft } from "react-icons/fi";

function CreateUser() {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      address: "",
      role: "User",
    });

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
          "/users/signup",
          formData
        );

        toast.success(
          "User created successfully"
        );

        navigate("/admin/users");

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
          "Failed to create user"
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
            Create User
          </h1>
          <p className="text-slate-400">Add a new user to your system</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="card-base p-8 space-y-6"
        >

          <div>
            <label className="block text-slate-300 font-semibold mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input-base w-full"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-base w-full"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
              className="input-base w-full"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-2">Address</label>
            <textarea
              name="address"
              rows="4"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleChange}
              className="input-base w-full resize-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-2">User Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="input-base w-full"
            >

              <option value="User">
                User
              </option>

              <option value="Admin">
                Admin
              </option>

              <option value="StoreOwner">
                Store Owner
              </option>

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
                : "Create User"}
            </button>
          </div>

        </form>

      </div>

    </DashboardLayout>

  );

}

export default CreateUser;