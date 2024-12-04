import React from "react";
import { Link, useLocation } from "wouter";
import { useJwt } from "../UserStore"; // Import the useJwt hook

function Navbar({ isNavbarShowing, toggleNavbar }) {
  const [location, setLocation] = useLocation();
  const { getUserName, clearJwt, clearUserName} = useJwt(); // Use `clearJwt` to handle logout
  const userName = getUserName() || "Guest"; // Fallback to "Guest" if no username is available

  const handleCloseNavbar = () => {
    if (isNavbarShowing) toggleNavbar(false);
  };

  const handleLogout = () => {
    clearJwt(); // Clear JWT and reset user state
    clearUserName();
    setLocation("/login"); // Redirect to login page
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark position-fixed top-0 start-0 w-100"
      style={{ zIndex: 1000 }}
      onMouseLeave={handleCloseNavbar}
    >
      <div className="container">
        <a className="navbar-brand" href="/">
          {userName}'s BattleOn
        </a>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => toggleNavbar(!isNavbarShowing)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isNavbarShowing ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            {[ // Navigation links
              { href: "/", label: "Home" },
              { href: "/arena", label: "Arena" },
              { href: "/shop", label: "Shop" },
              { href: "/about", label: "About" },
              { href: "/register", label: "Register" },
              { href: "/cart", label: "Cart" },
              { href: "/inventory", label: "Inventory" },
              userName === "Guest"
                ? { href: "/login", label: "Login" } // Show Login for guests
                : { href: "#", label: "Logout", onClick: handleLogout }, // Show Logout for logged-in users
            ].map(({ href, label, onClick }) => (
              <li className="nav-item" key={href}>
                <Link
                  href={href}
                  className={`nav-link ${location === href ? "active" : ""}`}
                  onClick={(e) => {
                    handleCloseNavbar();
                    if (onClick) {
                      e.preventDefault(); // Prevent default navigation for Logout
                      onClick();
                    }
                  }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
