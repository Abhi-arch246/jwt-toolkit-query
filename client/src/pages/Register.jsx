import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRegisterUserMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import toast, { Toaster } from "react-hot-toast";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) navigate("/home");
  }, [navigate, userInfo]);

  const registerSubmit = async (data, e) => {
    e.preventDefault();
    if (data.password !== data.cpassword)
      toast.error("Password's should match");
    else {
      const userData = {
        email: data.email,
        name: data.name,
        password: data.password,
      };
      try {
        const res = await registerUser(userData).unwrap();
        dispatch(setCredentials({ ...res }));
        if (res.status) toast.success(res.message);
        else toast.error(res.message);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className=" bg-slate-500">
      <h1 className="text-center pt-3 font-bold text-3xl">Register | JWT</h1>
      <div className="flex h-screen justify-center items-center">
        <form
          onSubmit={handleSubmit(registerSubmit)}
          className="px-20 pb-10 rounded-xl bg-sky-400"
        >
          <br />
          <label className="text-xl">Name</label>
          <input
            className="w-full text-decoration-none rounded p-3"
            type="text"
            placeholder="Enter name"
            {...register("name", { required: true, minLength: 4 })}
          />
          {errors.name && (
            <span className="text-red-900">
              Name should have atleast 4 characters
            </span>
          )}
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
          <label className="text-xl">Password</label>
          <input
            className="w-full text-decoration-none rounded p-3"
            type="password"
            placeholder="Enter password"
            {...register("password", { required: true, minLength: 8 })}
          />
          {errors.password && (
            <span className="text-red-900">
              Password should be atleast 8 characters
            </span>
          )}

          <br />
          <label className="text-xl mt-3">Confirm Password</label>
          <input
            className="w-full text-decoration-none rounded p-3"
            type="password"
            placeholder="Enter confirm password"
            {...register("cpassword", { required: true, minLength: 8 })}
          />
          {errors.cpassword && (
            <span className="text-red-900">
              Password should be atleast 8 characters
            </span>
          )}
          <br />
          <input
            className="hover:cursor-pointer mt-8 w-full mx-auto bg-white p-2 rounded font-bold"
            type="submit"
            value="Submit"
          />
          <Link
            className="flex mt-3 justify-center underline hover:cursor-pointer"
            to="/"
          >
            Have account? Login here
          </Link>
        </form>
      </div>
      <Toaster />
    </div>
  );
}

export default Register;
