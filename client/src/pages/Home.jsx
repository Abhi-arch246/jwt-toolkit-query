import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "./nav";
import toast, { Toaster } from "react-hot-toast";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("userInfo"));
    if (!local) {
      navigate("/");
    }
  });
  return (
    <>
      <Nav />
      <h1 className="text-center text-3xl font-bold m-2">Home Page</h1>
      <Toaster />
    </>
  );
}

export default Home;
