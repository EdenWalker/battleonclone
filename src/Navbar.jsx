import React, { useEffect } from "react";
import { Link, useLocation } from "wouter";

function Navbar({ isNavbarShowing, toggleNavbar }) {
  const [location] = useLocation();

  useEffect(() => {
    const handleResize = () => {
      console.log("Window resized", window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        <a className="navbar-brand" href="/">BattleOn</a>
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
