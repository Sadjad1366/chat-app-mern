import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Avatar from "./Avatar";
import { HiDotsVertical } from "react-icons/hi";
import { FaAngleLeft } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa6";
import uploadFile from "../helpers/uploadfile";
import { IoMdClose } from "react-icons/io";
import Loading from "./Loading";
import backgroundImage from "../assets/brandstroy.jpg";
import { IoMdSend } from "react-icons/io";
import moment from 'moment'


const MessagePage = () => {
  const params = useParams();
  const socketConnection = useSelector(
    (state) => state?.user?.socketConnection
  );
  const user = useSelector((state) => state?.user);
  const [dataUser, setDataUser] = React.useState({
    name: "",
    email: "",
    profile_pic: "",
    online: false,
    _id: "",
  });
  const [openImageVideoUpload, setOpenImageVideoUpload] = React.useState(false);
  const [message, setMessage] = React.useState({
    text: "",
    imageUrl: "",
    videoUrl: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [allMessage, setAllMessage] = React.useState([])
  const currentMessage = React.useRef(null)

  React.useEffect(() => {
    if(currentMessage.current) {
      currentMessage.current.scrollIntoView({behavior: 'smooth', block: 'end'})
    }
  }, [])

  const handleUploadImageVideoOpen = () => {
    setOpenImageVideoUpload((prev) => !prev);
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    setLoading(true);
    const uploadPhoto = await uploadFile(file);
    setLoading(false);
    setOpenImageVideoUpload(false);
    setMessage((prev) => {
      return {
        ...prev,
        imageUrl: uploadPhoto.url,
      };
    });
  };

  const handleClearUploadImage = () => {
    setMessage((prev) => {
      return {
        ...prev,
        imageUrl: "",
      };
    });
  };

  const handleUploadVideo = async (e) => {
    const file = e.target.files[0];
    setLoading(true);
    const uploadVideo = await uploadFile(file);
    setLoading(false);
    setOpenImageVideoUpload(false);
    setMessage((prev) => {
      return {
        ...prev,
        videoUrl: uploadVideo.url,
      };
    });
  };

  const handleClearUploadVideo = () => {
    setMessage((prev) => {
      return {
        ...prev,
        videoUrl: "",
      };
    });
  };

  React.useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("message-page", params.userId);

      socketConnection.emit('seen', params.userId)

      socketConnection.on("message-user", (data) => {
        setDataUser(data);
      });
      socketConnection.on('message', (data) => {
        console.log("message data", data)
        setAllMessage(data)
      })
    }
  }, [socketConnection, params?.userId, user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setMessage((prev) => {
      return {
        ...prev,
        text: value,
      };
    });
  };

  const handleSendMessage = (e) => {
   e.preventDefault();

   if(message.text || message.imageUrl || message.videoUrl) {
    if(socketConnection) {
      socketConnection.emit('new message', {
        sender: user?._id,
        reciever: params.userId,
        text: message.text,
        imageUrl: message.imageUrl,
        videoUrl: message.videoUrl,
        msgByUserId: user?._id
      })
      setMessage({
        text: "",
        imageUrl: "",
        videoUrl: "",
      })
    }
   }
  }

  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="bg-no-repeat bg-cover"
    >
      <header className="w-full sticky top-0 h-16 bg-white flex justify-between items-center">
        <div className="flex items-center gap-x-3">
          <Link to={"/"} className="lg:hidden">
            <FaAngleLeft size={30} />
          </Link>
          <div>
            <Avatar
              width={50}
              height={50}
              imageUrl={dataUser?.profile_pic}
              name={dataUser?.name}
              userId={dataUser?._id}
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg my-0 text-ellipsis line-clamp-1">
              {dataUser?.name}
            </h3>
            <p className="-my-2 text-sm">
              {dataUser.online ? (
                <span className="text-green-500">online</span>
              ) : (
                <span className="text-slate-400">offline</span>
              )}
            </p>
          </div>
        </div>
        <div>
          <butto className="cursor-pointer hover:bg-green-500">
            <HiDotsVertical />
          </butto>
        </div>
      </header>

      {/**show all messages*/}
      <section className="h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollbar bg-slate-200 bg-opacity-30">

        {/**all message show here */}
        <div ref={currentMessage} className="flex flex-col gap-2 py-2 mx-2">
        {allMessage?.map((msg, index) => {
          return (
            <div className={` p-1 py-1 rounded w-fit max-w-md max-h-[20px] ${user._id === msg.msgByUserId ? "ml-auto bg-teal-100" : "bg-white"}`}>
              <div className='w-full'>
                {
                  msg?.imageUrl && (
                    <img
                    src={msg?.imageUrl}
                    className='w-full h-full object-scale-down'
                    />
                  )
                }
              </div>
              <div className='w-full'>
                {
                  msg?.videoUrl && (
                    <video
                    controls
                    src={msg?.videoUrl}
                    className='w-full h-full object-scale-down'
                    />
                  )
                }
              </div>
             <p className="px-2">{msg.text}</p>
             <p className='text-xs ml-auto w-fit'>{moment(msg.createdAt).format('hh:mm')}</p>
            </div>
          )
        })}
        </div>

              {/**upload Image Display*/}
              {message.imageUrl && (
          <div className="w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden">
            <div
              onClick={handleClearUploadImage}
              className="w-fit absolute top-0 right-0  cursor-pointer"
            >
              <IoMdClose className="hover:text-red-500" size={30} />
            </div>
            <div className="bg-white p-3">
              <img
                src={message.imageUrl}
                alt="uploadImage"
                className="aspect-square w-full h-full max-w-sm m-2 object-scale-down"
              />
            </div>
          </div>
        )}
        {/**upload Image Display*/}
        {message.videoUrl && (
          <div className="w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden">
            <div
              onClick={handleClearUploadVideo}
              className="w-fit absolute top-0 right-0  cursor-pointer"
            >
              <IoMdClose className="hover:text-red-500" size={30} />
            </div>
            <div className="bg-white p-3">
              <video
                src={message.videoUrl}
                alt="uploadVideo"
                className="aspect-square w-full h-full max-w-sm m-2 object-scale-down"
                controls
                muted
                autoplay
              />
            </div>
          </div>
        )}
        {loading && (
          <div className="w-full h-full sticky bottom-0 flex justify-center items-center">
            <Loading />
          </div>
        )}
      </section>

      {/**send messages*/}
      <section className="h-16 bg-white flex items-center px-4">
        <div className="relative">
          <button
            onClick={handleUploadImageVideoOpen}
            className="flex justify-center items-center w-14 h-14 rounded-full hover:bg-green-500 hover:text-white"
          >
            <FaPlus />
          </button>

          {/**video and image*/}
          {openImageVideoUpload && (
            <div className="bg-white shadow rounded absolute bottom-12 w-36 p-2">
              <form>
                <label
                  htmlFor="uploadImage"
                  className="flex items-center p-2 gap-3"
                >
                  <div className="text-green-500">
                    <FaImage size={18} />
                  </div>
                  <p>Image</p>
                </label>
                <label
                  htmlFor="uploadVideo"
                  className="flex items-center p-2 gap-3"
                >
                  <div className="text-green-500">
                    <FaVideo size={18} />
                  </div>
                  <p>Video</p>
                </label>
                <input
                  type="file"
                  id="uploadImage"
                  onChange={handleUploadImage}
                  className="hidden"
                />

                <input
                  type="file"
                  id="uploadVideo"
                  onChange={handleUploadVideo}
                  className="hidden"
                />
              </form>
            </div>
          )}
        </div>
        {/**input box*/}
        <form onSubmit={handleSendMessage} className="w-full h-full flex gap-2 ">
            <input
              type="text"
              placeholder="Type Messag... "
              className="w-full h-full py-1 px-4 outline-none"
              value={message.text}
              onChange={handleOnChange}
            />
            <button className="hover:text-green-400"><IoMdSend size={25}/></button>
        </form>
      </section>
    </div>
  );
};

export default MessagePage;
