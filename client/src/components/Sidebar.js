import React from "react";
import { BsFillChatTextFill } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa6";
import { CgLogOut } from "react-icons/cg";
import { className } from "../utils/classname";
import { NavLink } from "react-router-dom";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";
import EditUserDetails from "./EditUserDetails";

const Sidebar = () => {
  const user = useSelector((state) => state.user);
  const [editUserOpen, setEditUserOpen] = React.useState(false);
  return (
    <div className="w-full h-full">
      <div className="bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 flex flex-col justify-between">
        <div>
          <NavLink
            className={({ isActive }) =>
              `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded ${
                isActive && "bg-slate-400"
              }`
            }
            title="chat"
          >
            <BsFillChatTextFill size={25} />
          </NavLink>
          <div
            title="Add User"
            className={className(
              "w-12 h-12 flex justify-center items-center",
              "cursor-pointer hover:bg-slate-200 rounded"
            )}
          >
            <FaUserPlus size={25} />
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
      {/**edit user details */}
      {editUserOpen && (
        <EditUserDetails onClose={() => setEditUserOpen(false)} user={user} />
      )}
    </div>
  );
};

export default Sidebar;
