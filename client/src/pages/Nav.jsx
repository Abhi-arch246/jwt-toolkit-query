import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogOutMutation } from "../slices/usersApiSlice";
import { logOut } from "../slices/authSlice";
import { BiSolidUserCircle } from "react-icons/bi";
import { FaSignOutAlt } from "react-icons/fa";

function Nav() {
  const local = JSON.parse(localStorage.getItem("userInfo"));
  const [logoutApiCall] = useLogOutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOutSubmit = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logOut());
      navigate("/");
    } catch (error) {
      console.log(error.error);
    }
  };

  return (
    <nav className="flex justify-around font-bold bg-orange-300 h-12">
      <h1 className="p-2 text-2xl">MERN Toolkit JWT</h1>
      <div className="p-2 space-x-6">
        <Link className="hover:text-slate-500" to="/home">
          Home
        </Link>
        <Link className="hover:text-slate-500" to="/profile">
          <BiSolidUserCircle size={25} className="inline" />
          {local.name}
        </Link>
        <Link onClick={logOutSubmit} className="hover:text-slate-500">
          <FaSignOutAlt size={25} className="inline" />
          Sign out
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
