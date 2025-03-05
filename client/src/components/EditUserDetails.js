import React from "react";
import axios from "axios";
import Avatar from "./Avatar";
import Divider from "./Divider";
import toast from 'react-hot-toast'
import uploadFile from "../helpers/uploadfile";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

const EditUserDetails = ({ onClose, user }) => {
  const [data, setData] = React.useState({
    name: user?.user,
    profile_pic: user?.profile_pic,
  });
  const uploadPhotoRef = React.useRef();
  const dispatch = useDispatch();

  React.useEffect(() => {
    setData((prev) => {
      return {
        ...prev,
        ...user,
      };
    });
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    const uploadPhoto = await uploadFile(file);
    console.log("uploadPhoto:", uploadPhoto);
    setData((prev) => {
      return {
        ...prev,
        profile_pic: uploadPhoto?.url,
      };
    });
  };

const handleOpenUploadPhoto = (e) => {
      e.preventDefault();
      e.stopPropagation();
      uploadPhotoRef.current.click()
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/update-user`

      const response = await axios({
            method: 'post',
            url: URL,
            data: data,
            withCredentials: true
      })
      toast.success(response?.data?.message);

      if(response.data.success){
            dispatch(setUser(response.data.data))
            onClose()
      }

    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  };

  return (
    <div className="fixed bottom-0 top-0 right-0 left-0 bg-gray-600 bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-4 m-1 py-6 rounded w-full max-w-sm">
        <h2 className="font-semibold">Profile Details</h2>
        <p className="text-sm">Edit user details</p>
        <form onSubmit={handleSubmit} className="grid gap-3 mt-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              id="name"
              value={data.name}
              onChange={handleOnChange}
              className="w-full py-1 px-2 focus:outline-green-500 border-0.5"
            />
          </div>
          <div>
            <div>Photo</div>
            <div className="my-1 flex items-center gap-4">
              <Avatar
                width={40}
                height={40}
                imageUrl={data?.profile_pic}
                name={data?.name}
              />
               <label htmlFor="profile_pic">
              <button className="font-semibold" onClick={handleOpenUploadPhoto}>Change Photo</button>
              <input
              id="profile_pic"
                type="file"
                className="hidden"
                onChange={handleUploadPhoto}
                ref={uploadPhotoRef}
              />
              </label>
            </div>
          </div>
          <Divider/>
          <div className="flex w-fit gap-x-4 ml-auto">
            <button onClick={onClose} className="px-4 rounded-md py-2 border border-green-600 text-green-600 bg-white">Cancel</button>
            <button onClick={handleSubmit} className="px-4 rounded-md py-2 border border-white text-white bg-green-600">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(EditUserDetails);
