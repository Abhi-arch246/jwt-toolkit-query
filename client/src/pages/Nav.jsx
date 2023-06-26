import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();
  const signOut = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  return (
    <nav className="flex justify-around font-bold bg-orange-300 h-12">
      <h1 className="p-2 text-2xl">MERN Toolkit JWT</h1>
      <div className="p-2 space-x-6">
        <Link className="hover:text-slate-500" to="/home">
          Home
        </Link>
        <Link className="hover:text-slate-500" to="/profile">
          Profile
        </Link>
        <Link onClick={signOut} className="hover:text-slate-500" to="/home">
          Sign out
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
