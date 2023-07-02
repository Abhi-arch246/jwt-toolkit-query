import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import toast, { Toaster } from "react-hot-toast";
import Nav from "./nav";

function Profile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateUser] = useUpdateUserMutation();
  // console.log(userInfo.name);

  const updateSubmit = async (data, e) => {
    e.preventDefault();
    if (data.password !== data.cpassword)
      toast.error("Password's should match");
    else {
      try {
        const res = await updateUser({
          _id: userInfo._id,
          name: data.name,
          email: data.email,
          cupassword: data.cupassword,
          password: data.password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        if (res.status) {
          toast.success(res.message);

          setTimeout(() => {
            localStorage.removeItem("userInfo");
            navigate("/");
          }, 3000);
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  return (
    <>
      <Nav />
      <h1 className="text-center pt-6 font-bold text-3xl">
        Update Profile | JWT
      </h1>
      <div className="flex mt-16 justify-center items-center">
        <form
          onSubmit={handleSubmit(updateSubmit)}
          className="px-20 pb-10 rounded-xl bg-sky-400"
        >
          <br />
          <label className="text-xl">Name</label>
          <input
            className="w-full text-decoration-none rounded p-3"
            type="text"
            value={userInfo.name}
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
            value={userInfo.email}
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-900">Email is required</span>
          )}
          <br />
          <label className="text-xl">Current Password</label>
          <input
            className="w-full text-decoration-none rounded p-3"
            type="password"
            placeholder="Enter current password"
            {...register("cupassword", { required: true, minLength: 8 })}
          />
          {errors.cupassword && (
            <span className="text-red-900">
              Password should be atleast 8 characters
            </span>
          )}
          <br />
          <label className="text-xl">New Password</label>
          <input
            className="w-full text-decoration-none rounded p-3"
            type="password"
            placeholder="Enter new password"
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
            value="Update Details"
          />
        </form>
      </div>
      <Toaster />
    </>
  );
}

export default Profile;
