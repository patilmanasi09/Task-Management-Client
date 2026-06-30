import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTasks,
  FaUser,
  FaUsers,
  FaPlusCircle,
  FaHome,
  FaKey,
} from "react-icons/fa";
import { useUser } from "../context/UserContext";

const Asidebar = () => {
  const { user } = useUser();
  const location = useLocation();

  const userMenus = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },
    {
      title: "My Tasks",
      path: "/my-tasks",
      icon: <FaTasks />,
    },
    {
      title: "Profile",
      path: "/profile",
      icon: <FaUser />,
    },
    {
  title: "Change Password",
  path: "/change-password",
  icon: <FaKey />,
},
  ];

  const adminMenus = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },
    {
      title: "All Tasks",
      path: "/all-tasks",
      icon: <FaTasks />,
    },
    {
      title: "Create Task",
      path: "/create-task",
      icon: <FaPlusCircle />,
    },
    {
      title: "Users",
      path: "/users",
      icon: <FaUsers />,
    },
    {
      title: "My Tasks",
      path: "/my-tasks",
      icon: <FaTasks />,
    },
    {
      title: "Profile",
      path: "/profile",
      icon: <FaUser />,
    },
    {
  title: "Change Password",
  path: "/change-password",
  icon: <FaKey />,
},
  ];

  const menus = user?.role === "admin" ? adminMenus : userMenus;

  return (
    <aside
      className="text-white p-3"
      style={{
        width: "240px",
        position: "fixed",
        left: 0,
        top: "70px",
        height: "calc(100vh - 70px)",
        background: "linear-gradient(180deg,#0f172a,#020617)",
        overflowY: "auto",
      }}
    >
      <h5 className="mb-4">Menu</h5>

      {menus.map((menu) => (
        <Link
          key={menu.path}
          to={menu.path}
          className={`d-flex align-items-center gap-2 text-decoration-none p-2 rounded mb-2 ${
            location.pathname === menu.path
              ? "bg-primary text-white"
              : "text-white"
          }`}
        >
          {menu.icon}
          <span>{menu.title}</span>
        </Link>
      ))}
    </aside>
  );
};

export default Asidebar;