import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { logout, setUser } from "../redux/userSlice";
import Sidebar from "../components/Sidebar";
import logo from '../assets/logo.jpg'

const Home = () => {
  const user = useSelector((state) => state.user);
  console.log("redux user", user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUserDetails = async () => {
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user-details`;
      const response = await axios({
        url: URL,
        withCredentials: true,
      });
      dispatch(setUser(response.data.data));

      if (response.data.data.logout) {
        dispatch(logout());
        navigate("/email");
      }
      console.log("current user details", response);
    } catch (error) {
      console.error("error: ", error);
    }
  };
  React.useEffect(() => {
    fetchUserDetails();
  }, []);

  const basePath = location.pathname === '/'

  return (
    <div className="grid lg:grid-cols-[300px,1fr] h-screen max-h-screen">
      <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
        <Sidebar />
      </section>
      {/* Message component */}
      <section className={`${basePath && "hidden"}`}>
        <Outlet />
      </section>
      <div className="lg:flex flex-col justify-center items-center hidden">
        <div>
          <img src={logo}
          width={200}
          alt="logo"
          />
        </div>
        <p className="text-lg mt-2 text-slate-500">Select a user to chat</p>
      </div>
    </div>
  );
};

export default Home;
