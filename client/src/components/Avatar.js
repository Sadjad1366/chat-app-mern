import React from "react";
import { LuCircleUserRound } from "react-icons/lu";
import { useSelector } from "react-redux";

const Avatar = ({ userId, name, imageUrl, width, height }) => {
  const onlineUser = useSelector(state => state?.user?.onlineUser)
  //Sadjad Ghasemi

  let avatarName = "";

  if (name) {
    const splitName = name?.split(" ");

    if (splitName.length > 1) {
      avatarName = splitName[0][0] + splitName[1][0];
    } else {
      avatarName = splitName[0][0];
    }
  }
  const bgColor = [
      'bg-slate-200',
      'bg-red-200',
      'bg-yellow-200',
      'bg-teal-200',
      'bg-green-200',
      'bg-cyan-200',
      'bg-sky-200',
  ]
  const randomNumber = Math.floor(Math.random()* 7)

  const isOnline = onlineUser.includes(userId)
  return (
    <div
      className={`text-slate-800 overflow-hidden rounded-full font-bol relative `}
      style={{ width: width + "px", height: height + "px" }}
    >
          {
            imageUrl ? (
                <img
                    src={imageUrl}
                    width={width}
                    height={height}
                    alt={name}
                    className='overflow-hidden rounded-full'
                />
            ) : (
                name ? (
                    <div  style={{width : width+"px", height : height+"px" }} className={`rounded-full flex justify-center items-center text-lg ${bgColor[randomNumber]}`}>
                        {avatarName}
                    </div>
                ) :(
                  <LuCircleUserRound
                    size={width}
                  />
                )
            )
        }
        {isOnline && (
        <div className="bg-green-500 p-1 absolute bottom-2 right-1 rounded-full z-10"></div>

        )}
    </div>
  );
};

export default Avatar;
