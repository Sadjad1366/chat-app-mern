import React from "react";
import { LuCircleUserRound } from "react-icons/lu";

const Avatar = ({ userId, name, imageUrl, width, height }) => {
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
  console.log(randomNumber);

  return (
    <div
      className={`text-slate-800 overflow-hidden rounded-full font-bold `}
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
                    <div  style={{width : width+"px", height : height+"px" }} className={`overflow-hidden rounded-full flex justify-center items-center text-lg ${bgColor[randomNumber]}`}>
                        {avatarName}
                    </div>
                ) :(
                  <LuCircleUserRound
                    size={width}
                  />
                )
            )
        }
    </div>
  );
};

export default Avatar;
