import React, { useEffect, useState } from "react";
import {
  FaSignOutAlt,
  FaUserCircle,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Navbar = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    if (theme === "dark") {
      document.body.style.backgroundColor = "#121212";
      document.body.style.color = "#ffffff";
    } else {
      document.body.style.backgroundColor = "#f8f9fa";
      document.body.style.color = "#000000";
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav
      className="navbar shadow-sm"
      style={{
        background:
          theme === "dark"
            ? "#1f2937"
            : "linear-gradient(90deg,#2563eb,#1d4ed8)",
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000,
        height: "70px",
      }}
    >
      <div className="container-fluid">

        {/* Logo */}
        <span
          className="navbar-brand fw-bold fs-3"
          style={{ color: "#fff" }}
        >
          Task Management System
        </span>

        <div className="d-flex align-items-center gap-3">

          {/* Theme Button */}
          <button
            className="btn btn-light rounded-circle"
            onClick={toggleTheme}
            title="Toggle Theme"
            style={{
              width: "42px",
              height: "42px",
            }}
          >
            {theme === "light" ? (
              <FaMoon />
            ) : (
              <FaSun color="orange" />
            )}
          </button>

          {/* User */}
          <span
            className="fw-semibold d-flex align-items-center"
            style={{ color: "#fff" }}
          >
            {user?.imgPath ? (
              <img
                src={`${user.imgPath}?v=${new Date(
                  user.updatedAt || Date.now()
                ).getTime()}`}
                alt="Profile"
                className="rounded-circle me-2"
                style={{
                  width: "42px",
                  height: "42px",
                  objectFit: "cover",
                  border: "2px solid white",
                }}
              />
            ) : (
              <FaUserCircle
                size={38}
                className="me-2"
              />
            )}

            {user?.name}
          </span>

          {/* Logout */}
          <button
            className="btn btn-light"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            <span className="ms-2">Logout</span>
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;