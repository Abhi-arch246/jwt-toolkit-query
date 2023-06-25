import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const loginSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className=" bg-slate-500">
      <h1 className="text-center pt-3 font-bold text-3xl">Login | JWT</h1>
      <div className="flex h-screen min-h-full justify-center items-center">
        <form
          onSubmit={handleSubmit(loginSubmit)}
          className="px-20 pb-10 rounded-xl bg-sky-400"
        >
          <br />
          <label className="text-xl">Email</label>
          <input
            className="w-full text-decoration-none rounded p-3"
            type="email"
            placeholder="Enter email id"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-900">Email is required</span>
          )}

          <br />
          <br />
          <label className="text-xl mt-5">Password</label>
          <input
            className="w-full text-decoration-none rounded p-3"
            type="password"
            placeholder="Enter password"
            {...register("password", { required: true, minLength: 8 })}
          />
          {errors.password && (
            <span className="text-red-900">
              Password should atleast be 8 characters
            </span>
          )}
          <br />
          <br />
          <input
            className="hover:cursor-pointer mt-5 w-full block mx-auto bg-white p-2 rounded font-bold"
            type="submit"
            value="Submit"
          />
          <br />
          <Link
            to="/register"
            className="flex justify-center underline hover:cursor-pointer"
          >
            New? Register here.
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
