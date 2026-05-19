import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user } = useAuth();

  return (
    <div className="h-[70px] bg-gradient-to-r from-slate-900/80 via-slate-800/80 to-slate-900/80 border-b border-slate-700/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-40 shadow-card">
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-primary-600 animate-pulse-subtle"></div>
        <h1 className="gradient-text text-2xl font-bold">
          Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-700 to-primary-600 flex items-center justify-center text-white font-bold shadow-lg">
          {user?.name?.charAt(0)}
        </div>

        <div className="border-l border-slate-600/50 pl-4">
          <p className="text-white text-sm font-semibold">
            {user?.name}
          </p>

          <p className="text-slate-400 text-xs font-medium">
            {user?.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;