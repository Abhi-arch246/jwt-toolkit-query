import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogOutMutation } from "../slices/usersApiSlice";
import { logOut } from "../slices/authSlice";

function Nav() {
  const dispatch = useDispatch();
  const local = JSON.parse(localStorage.getItem("userInfo"));
  const [logOutApiCall] = useLogOutMutation();
  const navigate = useNavigate();
  const logOutSubmit = async () => {
    try {
      await logOutApiCall().unwrap();
      dispatch(logOut());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="flex justify-around font-bold bg-orange-300 h-12">
      <h1 className="p-2 text-2xl">MERN Toolkit JWT</h1>
      <div className="p-2 space-x-6">
        <Link className="hover:text-slate-500" to="/home">
          {local.name}
        </Link>
        <Link className="hover:text-slate-500" to="/profile">
          Profile
        </Link>
        <Link
          onClick={logOutSubmit}
          className="hover:text-slate-500"
          to="/home"
        >
          Sign out
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
