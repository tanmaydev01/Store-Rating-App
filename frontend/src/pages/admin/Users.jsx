import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import API from "../../api/axios";

import toast from "react-hot-toast";

import { FiPlus, FiSearch, FiFilter, FiArrowUp, FiArrowDown, FiUser, FiMail, FiShield } from "react-icons/fi";

function Users() {

  const [users, setUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [sortBy, setSortBy] =
    useState("name");

  const [sortDir, setSortDir] =
    useState("asc");

  const fetchUsers = async () => {

    try {

      setLoading(true);

      const { data } = await API.get(
        `/users?page=${page}&limit=5`
      );

      const usersData =
        data.users || [];

      const filteredUsers =
        usersData.filter((user) => {

          const query =
            search.toLowerCase();

          return (

            user.name
              ?.toLowerCase()
              .includes(query) ||

            user.email
              ?.toLowerCase()
              .includes(query) ||

            user.role
              ?.toLowerCase()
              .includes(query) ||

            user.address
              ?.toLowerCase()
              .includes(query)

          );

        });

      filteredUsers.sort((a, b) => {
        const aVal = a[sortBy]?.toString() || "";
        const bVal = b[sortBy]?.toString() || "";
        const comparison = aVal.localeCompare(bVal);
        return sortDir === "asc" ? comparison : -comparison;
      });

      setUsers(filteredUsers);

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to fetch users"
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchUsers();
  }, [search, page, sortBy, sortDir]);

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "Admin":
        return "from-red-600/20 to-red-700/10 border-red-600/30 text-red-300";
      case "StoreOwner":
        return "from-amber-600/20 to-amber-700/10 border-amber-600/30 text-amber-300";
      default:
        return "from-slate-500/20 to-slate-600/10 border-slate-500/30 text-slate-300";
    }
  };

  return (

    <DashboardLayout>

      <div className="space-y-6 animate-fade-in">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div>
            <h1 className="section-title text-4xl mb-2">
              Users
            </h1>
            <p className="text-slate-400">Manage user accounts and roles</p>
          </div>

          <Link
            to="/admin/create-user"
            className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <FiPlus /> Add User
          </Link>

        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
            <input
              type="text"
              placeholder="Search by name, email, role, or address..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="input-base pl-12 w-full"
            />
          </div>

          <div className="flex gap-2 items-center">
            {/* Sort By Dropdown */}
            <div className="border border-slate-600/50 rounded-lg overflow-hidden bg-slate-800/30 backdrop-blur-sm">
              <div className="flex items-center">
                <label className="flex items-center gap-2 px-4 py-2.5 text-slate-300 text-sm font-medium whitespace-nowrap">
                  <FiFilter size={16} />
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-700/50 outline-none px-3 py-2 text-white cursor-pointer font-medium appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2394a3b8' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 8px center',
                    paddingRight: '28px',
                  }}
                >
                  <option value="name" className="bg-slate-800 text-white">Name</option>
                  <option value="email" className="bg-slate-800 text-white">Email</option>
                  <option value="role" className="bg-slate-800 text-white">Role</option>
                </select>
              </div>
            </div>

            {/* Sort Direction Toggle */}
            <button
              onClick={() =>
                setSortDir(sortDir === "asc" ? "desc" : "asc")
              }
              className="flex items-center gap-2 px-4 py-2.5 border border-slate-600/50 rounded-lg bg-slate-800/30 backdrop-blur-sm text-slate-300 hover:text-slate-100 hover:bg-slate-700/40 transition-all duration-200 font-medium text-sm"
            >
              {sortDir === "asc" ? (
                <>
                  <FiArrowUp size={16} />
                  <span>Ascending</span>
                </>
              ) : (
                <>
                  <FiArrowDown size={16} />
                  <span>Descending</span>
                </>
              )}
            </button>
          </div>
        </div>

        {loading ? (

          <div className="flex items-center justify-center py-16">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-slate-700 border-t-primary-600 rounded-full animate-spin"></div>
              <p className="text-slate-400">Loading users...</p>
            </div>
          </div>

        ) : users.length === 0 ? (

          <div className="card-base p-12 text-center">
            <p className="text-slate-400 mb-4">No users found</p>
            <p className="text-slate-500 text-sm">Try adjusting your search or add a new user</p>
          </div>

        ) : (

          <>
            <div className="card-base overflow-hidden">

              <div className="overflow-x-auto">
                <table className="w-full">

                  <thead>

                    <tr className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-b border-slate-700/50">

                      <th className="text-left text-slate-300 font-semibold px-6 py-4 text-sm uppercase tracking-wider">
                        Name
                      </th>

                      <th className="text-left text-slate-300 font-semibold px-6 py-4 text-sm uppercase tracking-wider">
                        Email
                      </th>

                      <th className="text-left text-slate-300 font-semibold px-6 py-4 text-sm uppercase tracking-wider">
                        Address
                      </th>

                      <th className="text-left text-slate-300 font-semibold px-6 py-4 text-sm uppercase tracking-wider">
                        Role
                      </th>

                    </tr>

                  </thead>

                  <tbody className="divide-y divide-slate-700/50">

                    {users.map((user) => (

                      <tr
                        key={user.id}
                        className="hover:bg-slate-700/20 transition-colors duration-200"
                      >

                        <td className="px-6 py-4 text-white font-medium">
                          {user.name}
                        </td>

                        <td className="px-6 py-4 text-slate-300">
                          {user.email}
                        </td>

                        <td className="px-6 py-4 text-slate-300">
                          {user.address || "—"}
                        </td>

                        <td className="px-6 py-4">

                          <span className={`
                            px-3 py-1.5 rounded-lg text-sm font-semibold border
                            bg-gradient-to-r ${getRoleBadgeColor(user.role)}
                          `}>
                            {user.role}
                          </span>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>
              </div>

            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between pt-4">
              <p className="text-slate-400 text-sm">Page {page}</p>
              
              <div className="flex gap-3">
                <button
                  onClick={() =>
                    setPage((prev) =>
                      Math.max(prev - 1, 1)
                    )
                  }
                  disabled={page === 1}
                  className="btn-outlined disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <button
                  onClick={() =>
                    setPage((prev) => prev + 1)
                  }
                  className="btn-primary"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}

      </div>

    </DashboardLayout>

  );

}

export default Users;