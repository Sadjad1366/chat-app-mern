import React from "react";
import { BsFillChatTextFill } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa6";
import { CgLogOut } from "react-icons/cg";
import { className } from "../utils/classname";
import { NavLink, useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import { useDispatch, useSelector } from "react-redux";
import EditUserDetails from "./EditUserDetails";
import { FiArrowUpLeft } from "react-icons/fi";
import SearchUser from "./SearchUser";
import { FaImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa6";
import { logout } from "../redux/userSlice";

const Sidebar = () => {
  const user = useSelector((state) => state.user);
  const [editUserOpen, setEditUserOpen] = React.useState(false);
  const [allUsers, setAllUsers] = React.useState([]);
  const [openSearchUser, setOpenSearchUser] = React.useState(false);
  const socketConnection = useSelector(
    (state) => state?.user?.socketConnection
  );
  const dispatch = useDispatch()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("sidebar", user._id);

      socketConnection.on("conversation", (data) => {
        console.log("conversation", data);
        const conversationUserData = data.map((conversationUser, index) => {
          if (
            conversationUser?.sender?._id === conversationUser?.reciever?._id
          ) {
            return {
              ...conversationUser,
              userDetails: conversationUser?.sender,
            };
          } else if (conversationUser?.reciever?._id !== user?._id) {
            return {
              ...conversationUser,
              userDetails: conversationUser.reciever,
            };
          } else {
            return {
              ...conversationUser,
              userDetails: conversationUser.sender,
            };
          }
        });

        setAllUsers(conversationUserData);
      });
    }
  }, [socketConnection, user]);

  const handleLogout = () => {
       dispatch(logout())
       navigate("/email")
       localStorage.clear()
  }
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
          onClick={handleLogout}
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
        <div className="bg-white p-[0.5px] mx-3"></div>
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

          {allUsers?.map((conv, index) => {
            return (
              <NavLink
                to={"/" + conv?.userDetails?._id}
                className="flex items-center gap-2 py-3 px-2 border border-transparent hover:border-green-400 rounded hover:bg-slate-300 cursor-pointer"
                key={conv?._id}
              >
                <div>
                  <Avatar
                    imageUrl={conv?.userDetails?.profile_pic}
                    name={conv?.userDetails?.name}
                    width={40}
                    height={40}
                  />
                </div>
                <div>
                  <h3 className="text-ellipsis line-clamp-1 text-sm font-semibold">
                    {conv?.userDetails?.name}
                  </h3>
                  <div className="text-xs text-slate-500 flex items-center gap-1">
                    <div>
                      {conv?.lastMsg?.imageUrl && (
                        <div className="flex items-center gap-1">
                          <span>
                            <FaImage />
                          </span>
                          {!conv?.lastMsg?.text && <span>Image</span>}
                        </div>
                      )}
                      {conv?.lastMsg?.videoUrl && (
                        <div className="flex items-center gap-1">
                          <span>
                            <FaVideo />
                          </span>
                          {!conv?.lastMsg?.text && <span>Video</span>}
                        </div>
                      )}
                    </div>
                    <p className="truncate line-clamp-1">{conv.lastMsg.text}</p>
                  </div>
                </div>
                {Boolean(conv?.unseenMsg) && (
                  <p className="text-xs ml-auto w-7 h-7 flex justify-center items-center bg-green-400 rounded-full text-white font-semibold">
                    {conv?.unseenMsg}
                  </p>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/**edit user details */}
      {editUserOpen && (
        <EditUserDetails onClose={() => setEditUserOpen(false)} user={user} />
      )}
      {/*search user*/}
      {openSearchUser && (
        <SearchUser onClose={() => setOpenSearchUser(false)} />
      )}
    </div>
  );
};

export default Sidebar;
