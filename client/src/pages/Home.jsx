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
      <div className="flex justify-center flex-col">
        <h1 className="text-center text-3xl font-bold m-4">Home Page</h1>
        <div className="my-12 text-center">
          <h2>
            JSON Web Tokens are an open, industry standard RFC 7519 method for
            representing claims securely between two parties.
          </h2>
          <h2>JWT.IO allows you to decode, verify and generate JWT.</h2>
        </div>
      </div>
      <div className="flex justify-around">
        <img
          src="https://images.pexels.com/photos/574073/pexels-photo-574073.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt=""
          width={500}
        />
        <div className="flex flex-col p-3">
          <h2>
            JSON Web Token (JWT) is an open standard (RFC 7519) that defines a
            compact and self-contained way for securely transmitting information
            between parties as a JSON object. This information can be verified
            and trusted because it is digitally signed.{" "}
          </h2>
          <br />
          <h2>
            JWTs can be signed using a secret (with HMAC algorithm) or a
            public/private key pair using RSA. Let’s explain some concepts of
            this definition further. Compact: Because of its size, it can be
            sent through an URL, POST parameter, or inside an HTTP header.
            Additionally, due to its size its transmission is fast.
            Self-contained: The payload contains all the required information
            about the user, to avoid querying the database more than once.
          </h2>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default Home;
