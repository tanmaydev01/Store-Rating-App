import Logo from "../components/Logo";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";


function MainLayout({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative">
      <header className="sticky top-0 z-50 border-b border-slate-700/50 backdrop-blur-md bg-slate-900/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo width={36} height={36} />
            <Link to="/" className="gradient-text font-bold text-xl">Store Rating</Link>
          </div>

          <nav className="ml-auto flex items-center gap-6">
            {!user ? (
              <>
                <Link to="/" className="text-slate-300 hover:text-white transition-colors">Login</Link>
                <Link to="/signup" className="btn-primary px-6">Sign Up</Link>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 border-l border-slate-600/50 pl-6">
                  <span className="text-slate-300">{user.name}</span>
                  <button 
                    onClick={logout} 
                    className="btn-outlined px-4 flex items-center gap-2"
                  >
                    <FiLogOut /> Logout
                  </button>
                </div>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1 relative">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {children}
        </div>
      </main>

      <footer className="border-t border-slate-700/50 backdrop-blur-md bg-slate-900/50 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center">
          <p className="text-slate-400 text-sm">© {new Date().getFullYear()} Store Rating — Built with care and modern design.</p>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;