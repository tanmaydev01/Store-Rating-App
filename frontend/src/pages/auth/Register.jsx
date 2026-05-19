import { useState } from "react";

import {
  FiMail,
  FiLock,
  FiUser,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import API from "../../api/axios";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      role: "User",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {
      return toast.error(
        "All fields are required"
      );
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(formData.email)
    ) {
      return toast.error(
        "Invalid email format"
      );
    }

    if (
      formData.password.length < 6
    ) {
      return toast.error(
        "Password must be at least 6 characters"
      );
    }

    try {
      setLoading(true);

      await API.post(
        "/users/signup",
        formData
      );

      toast.success(
        "Registration successful"
      );

      navigate("/login", {
        state: {
          email: formData.email,
        },
      });
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">
            Create Account
          </h1>

          <p className="text-gray-400 mt-2">
            Register to continue
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="text-gray-300 text-sm">
              Full Name
            </label>

            <div className="mt-2 flex items-center bg-gray-800 border border-gray-700 rounded-lg px-3 focus-within:border-indigo-500 transition">
              <FiUser className="text-gray-400" />

              <input
                type="text"
                name="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent outline-none px-3 py-3 text-white placeholder-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-300 text-sm">
              Email
            </label>

            <div className="mt-2 flex items-center bg-gray-800 border border-gray-700 rounded-lg px-3 focus-within:border-indigo-500 transition">
              <FiMail className="text-gray-400" />

              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent outline-none px-3 py-3 text-white placeholder-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-300 text-sm">
              Password
            </label>

            <div className="mt-2 flex items-center bg-gray-800 border border-gray-700 rounded-lg px-3 focus-within:border-indigo-500 transition">
              <FiLock className="text-gray-400" />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-transparent outline-none px-3 py-3 text-white placeholder-gray-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="text-gray-400 hover:text-white transition"
              >
                {showPassword ? (
                  <FiEyeOff size={20} />
                ) : (
                  <FiEye size={20} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-white py-3 rounded-lg font-semibold"
          >
            {loading
              ? "Loading..."
              : "Register"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-500 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;