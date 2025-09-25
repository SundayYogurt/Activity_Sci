import React from "react";
import { useAuthContext } from "../context/AuthContext";
import UserProfile from "./UserProfile";
import { Link } from "react-router";

const Navbar = () => {
  const { user } = useAuthContext();

  const menuItems = [
    { name: "New Activities", url: "/add-activities" },
    { name: "news", url: "/cart" },
    { name: "Home", url: "/" },
    { name: "Activities", url: "/activities" },
  ];

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {menuItems.map((item, i) => (
              <li key={i}>
                <Link to={item.url}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          Grab
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {menuItems.map((item, idx) => (
            <li key={idx}>
              <Link to={item.url}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end space-x-2.5">
        {user ? (
          <UserProfile />
        ) : (
          <div className="flex gap-5">
            <Link to="/register">
              <button className="btn btn-soft btn-primary">Register</button>
            </Link>
            <Link to="/login">
              <button className="btn btn-soft btn-accent">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
