import React from "react";
import { BsFillChatTextFill } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa6";
import { CgLogOut } from "react-icons/cg";
import { className } from "../utils/classname";
import { NavLink } from "react-router-dom";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";
import EditUserDetails from "./EditUserDetails";
import { FiArrowUpLeft } from "react-icons/fi";
import SearchUser from "./SearchUser";

const Sidebar = () => {
  const user = useSelector((state) => state.user);
  const [editUserOpen, setEditUserOpen] = React.useState(false);
  const [allUsers, setAllUsers] = React.useState([]);
  const [openSearchUser, setOpenSearchUser] = React.useState(false);
  return (
    <div className="w-full h-full grid grid-cols-[48px,1fr] bg-white">
      <div className="bg-slate-200 w-12 h-full rounded-tr-lg rounded-br-lg py-5 flex flex-col justify-between">
        <div>
          <NavLink
            className={({ isActive }) =>
              `w-12 h-11 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded ${
                isActive && "bg-slate-400"
              }`
            }
            title="chat"
          >
            <BsFillChatTextFill size={20} />
          </NavLink>
          <div
          onClick={() => setOpenSearchUser(true)}
            title="Add User"
            className={className(
              "w-12 h-12 flex justify-center items-center",
              "cursor-pointer hover:bg-slate-200 rounded"
            )}
          >
            <FaUserPlus size={20} />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <button
            title={user?.name}
            className="mx-auto"
            onClick={() => setEditUserOpen(true)}
          >
            <Avatar
              width={35}
              height={35}
              name={user?.name}
              imageUrl={user?.profile_pic}
              userId={user?._id}
            />
          </button>
          <button
            title="Logout"
            className={className(
              "w-12 h-12 flex justify-center items-center",
              "cursor-pointer hover:bg-slate-200 rounded"
            )}
          >
            <CgLogOut size={25} />
          </button>
        </div>
      </div>

      <div className="w-full">
        <div className="h-16 flex items-center">
          <h2 className="text-xl font-bold p-4 text-slate-800">Message</h2>
        </div>
        <div className="bg-slate-200 p-[0.5px] mx-3"></div>
        <div className="w-full bg-slate-100 h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar">
          {allUsers.length === 0 && (
            <div className="mt-12">
              <div className="flex justify-center items-center my-4 text-slate-500">
                <FiArrowUpLeft size={50} />
              </div>
              <p className="text-lg text-center text-slate-600">
                Explore users to start a conversation with.
              </p>
            </div>
          )}
        </div>
      </div>

      {/**edit user details */}
      {editUserOpen && (
        <EditUserDetails onClose={() => setEditUserOpen(false)} user={user} />
      )}
      {/*search user*/}
      {openSearchUser && (
        <SearchUser onClose={() =>setOpenSearchUser(false) }/>
      )}
    </div>
  );
};

export default Sidebar;
