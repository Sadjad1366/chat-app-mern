import React from "react";
import { IoIosClose } from "react-icons/io";
import { className } from "../utils/classname";
import { Link } from 'react-router-dom';
import uploadFile from "../helpers/uploadfile";

const RegisterPage = () => {
  const [data, setData] = React.useState({
    name: "",
    email: "",
    password: "",
    profile_pic: "",
  });

  const [uploadPhoto, setUploadPhoto] = React.useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadPhoto = async(e) => {
    const file = e.target.files[0];

    const uploadPhoto = await uploadFile(file)
    console.log("uploadPhoto:", uploadPhoto);
    setUploadPhoto(file);
    setData((prev) => {
      return {
        ...prev,
        profile_pic: uploadPhoto?.url
      }
    })
  };
  const handleClearPhoto = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setUploadPhoto(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("data ", data);
  };

  return (

    <div className="mt-5">
      <div className="bg-white w-full max-w-sm rounded overflow-hidden p-4 mx-auto">
        <h3>Welcome to Chat app</h3>

        <form className="grid gap-3" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name">Name: </label>
            <input
              className="bg-slate-300 outline-none px-3 py-2 focus:outline-green-500 rounded-lg"
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={data.name}
              onChange={handleOnChange}
              required
            />
          </div>
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
          <div className="flex flex-col">
            <label htmlFor="password">Password: </label>
            <input
              className="bg-slate-300 outline-none px-3 py-2 focus:outline-green-500 rounded-lg"
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={data.password}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="profile_pic">
              Photo:
              <div
                className={className(
                  "h-14 bg-slate-200 flex justify-center items-center border",
                  "hover:border-green-500 rounded-lg hover:cursor-pointer"
                )}
              >
                <p className="text-sm">
                  {uploadPhoto?.name ? uploadPhoto?.name : "Upload your photo"}
                </p>
                {uploadPhoto?.name && (
                  <button
                    className="ml-2 text-lg hover:text-red-600"
                    onClick={handleClearPhoto}
                  >
                    <IoIosClose />
                  </button>
                )}
              </div>
            </label>
            <input
              className="bg-slate-300 outline-none px-3 py-2 focus:outline-green-500 rounded-lg hidden"
              type="file"
              id="profile_pic"
              name="profile_pic"
              onChange={handleUploadPhoto}
            />
          </div>
          <button
            className={className(
              "bg-red-800 text-white font-semibold rounded-lg",
              " py-1 leading-relaxed hover:bg-red-600",
              "transition ease-in-out active:translate-y-1"
            )}
          >
            Register
          </button>
        </form>
        <p className="mt-2 text-center font-semibold"> Already have an Acoount ? <Link className=" text-blue-500 hover:text-blue-700 underline" to={"/email"}>Login</Link> </p>
      </div>
    </div>
  );
};

export default RegisterPage;
