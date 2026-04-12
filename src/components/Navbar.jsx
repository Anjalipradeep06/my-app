import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Auth";
import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="nav-list">

      <Link className="navbar-brand" to="/">
        LuxeStyles
      </Link>

      {/* 🔹 Normal Menu (Desktop) */}
      <div className="menu desktop-menu">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* 🔹 Dropdown (Mobile) */}
      <div className="dropdown mobile-menu">
        <button
          className="dropdown-btn"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {open && (
          <ul className="dropdown-menu-custom">
            <li><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>
            <li><Link to="/about" onClick={() => setOpen(false)}>About</Link></li>
            <li><Link to="/contact" onClick={() => setOpen(false)}>Contact</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </ul>
        )}
      </div>

    </nav>
  );
}

export default Navbar;
