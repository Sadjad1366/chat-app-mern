import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { IoIosClose } from "react-icons/io";
import { className } from "../utils/classname";
import uploadFile from "../helpers/uploadfile";
import { LuCircleUserRound } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";


const CheckEmailPage = () => {
  const [data, setData] = React.useState({
    email: "",
  });
  const navigate = useNavigate();

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

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/email`;
    try {
      const response = await axios.post(URL, data);
      toast.success(response.data.message);

      if (response.data.message) {
        setData({
          email: "",
        });
        navigate("/password", {
          state: response?.data?.data
        });
      }
    } catch (error) {
      toast.error(error?.response.data?.message);
      console.error(error);
    }
  };
  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-sm rounded overflow-hidden p-4 mx-auto">

        <div className ='w-fit mx-auto mb-2'>
        <LuCircleUserRound
        size={70}
         />

        </div>
        <h3 className='mb-3'>Welcome to Chat app</h3>

        <form className="grid gap-3" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="email">Email: </label>
            <input
              className="bg-slate-300 outline-none px-3 py-2 focus:outline-green-500 rounded-lg"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={data.email}
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
            Let's Go
          </button>
        </form>
        <p className="mt-2 text-center font-semibold">
          New User ?
          <Link
            className=" text-blue-500 hover:text-blue-700 underline"
            to={"/register"}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CheckEmailPage;
