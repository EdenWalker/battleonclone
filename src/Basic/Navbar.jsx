import React, { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { useJwt } from "../UserStore"; // Import the useJwt hook

function Navbar({ isNavbarShowing, toggleNavbar }) {
  const [location] = useLocation();
  const { jwt } = useJwt(); // Access the JWT from the store
  const [userName, setUserName] = useState("Guest");

  useEffect(() => {
    // Decode the JWT or fetch user data if needed
    if (jwt) {
      try {
        const decodedToken = JSON.parse(atob(jwt.split(".")[1])); // Decode JWT payload
        setUserName(decodedToken.name || ""); // Use the name from the payload or fallback
        console.log(decodedToken.name)
      } catch (error) {
        console.error("Error decoding JWT:", error);
      }
    }
  }, [jwt]);

  const handleCloseNavbar = () => {
    if (isNavbarShowing) toggleNavbar(false);
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
            {[
              { href: "/", label: "Home" },
              { href: "/arena", label: "Arena" },
              { href: "/shop", label: "Shop" },
              { href: "/about", label: "About" },
              { href: "/register", label: "Register" },
              { href: "/cart", label: "Cart" },
              { href: "/inventory", label: "Inventory" },
              { href: "/login", label: "Login" },
            ].map(({ href, label }) => (
              <li className="nav-item" key={href}>
                <Link
                  href={href}
                  className={`nav-link ${location === href ? "active" : ""}`}
                  onClick={handleCloseNavbar}
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
