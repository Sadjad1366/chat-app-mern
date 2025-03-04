import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { IoIosClose } from "react-icons/io";
import { className } from "../utils/classname";
import uploadFile from "../helpers/uploadfile";
import { LuCircleUserRound } from "react-icons/lu";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Avatar from "../components/Avatar";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../redux/userSlice";

const CheckPasswordPage = () => {
  const [data, setData] = React.useState({
    password: "",
    userId: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log("Location State: ", location.state);
    if (!location?.state?.name) {
      navigate("/email");
    }
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/password`;
    try {
      const response = await axios({
        method: "post",
        url: URL,
        data: {
          userId: location?.state._id,
          password: data.password,
        },
        withCredentials: true,
      });

      toast.success(response.data.message);

      if (response.data.message) {
        dispatch(setToken(response?.data?.token));
        localStorage.setItem("token", response?.data?.token);
        setData({
          password: "",
        });
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response.data?.message);
      console.error(error);
    }
  };
  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-sm rounded overflow-hidden p-4 mx-auto">
        <div className="w-fit mx-auto mb-2 flex justify-center items-center flex-col">
          {/* <LuCircleUserRound
        size={70}
         /> */}
          <Avatar
            width={70}
            height={70}
            name={location?.state?.name}
            imageUrl={location?.state?.profile_pic}
          />
          <h2 className="font-semibold text-lg mt-1">
            {location?.state?.name}
          </h2>
        </div>
        <h3 className="mb-3">Welcome to Chat app</h3>

        <form className="grid gap-3" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="email">Password: </label>
            <input
              className="bg-slate-300 outline-none px-3 py-2 focus:outline-green-500 rounded-lg"
              type="password"
              id="password"
              name="password"
              placeholder="Enter your passsword"
              value={data.password}
              onChange={handleOnChange}
              required
            />
          </div>
          <button
            className={className(
              "bg-red-800 text-white font-semibold rounded-lg",
              " py-1 leading-relaxed hover:bg-red-600",
              "transition ease-in-out active:translate-y-1"
            )}
          >
            Login
          </button>
        </form>
        <p className="mt-2 text-center font-semibold">
          <Link
            className=" text-blue-500 hover:text-blue-700 underline"
            to={"/forgot-password"}
          >
            Forgot Password ?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CheckPasswordPage;
