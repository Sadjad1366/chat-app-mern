import React from "react";
import { IoIosSearch } from "react-icons/io";
import Loading from "./Loading";
import UserSearchCard from "./UserSearchCard";
import toast from "react-hot-toast";
import axios from "axios";
import { IoIosClose } from "react-icons/io";


const SearchUser = ({onClose}) => {
  const [searchUser, setSearchUser] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const handleSearchUser = async () => {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/search-user`;

    try {
      setLoading(true);
      const response = await axios.post(URL, {
        search: search,
      });
      setLoading(false);
      setSearchUser(response.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  React.useEffect(() => {
    handleSearchUser();
    console.log("search user: ", searchUser);

  }, [search]);

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-slate-700 bg-opacity-40 p-2 z-10">
      <div className="w-full max-w-lg mx-auto mt-10">
        {/**input search user*/}
        <div className="bg-white rounded h-14 flex items-center">
          <input
            type="text"
            placeholder="Search user by name, email, ..."
            className="w-full outline-none py-1 h-full px-2 rounded-lg"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <div className="pr-3">
            <IoIosSearch className="text-slate-400" size={20} />
          </div>
        </div>
        {/** display search user*/}
        <div className="bg-white mt-2 w-full p-4 rounded overflow-y-scroll">
          {/**no user found*/}
          {searchUser.length === 0 && !loading && (
            <p className="text-center text-slate-500">no user found!</p>
          )}
          {loading && (
            <p>
              <Loading />
            </p>
          )}
          {searchUser?.length !== 0 &&
            !loading &&
            searchUser?.map((user, index) => {
              return <UserSearchCard key={user._id} user={user} onClose={onClose} />;
            })}
        </div>
      </div>
      <div className="absolute top-0 right-0 p-2">
        <IoIosClose className="hover:cursor-pointer hover:text-red-500" size={50} onClick={onClose}/>
      </div>
    </div>
  );
};

export default SearchUser;
