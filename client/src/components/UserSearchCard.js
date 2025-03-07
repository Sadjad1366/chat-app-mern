import React from 'react'
import Avatar from './Avatar'
import { Link } from 'react-router-dom'

const UserSearchCard = ({user, onClose}) => {
  return (
    <Link to={'/'+user?._id} onClick={onClose} className='flex gap-3 py-3 px-1 border-b-2 hover:bg-slate-200'>
      <div>
        <Avatar
        width={50}
        height={50}
        name={user.name}
        userId={user?._id}
        imageUrl={user?.profile_pic}
        />
      </div>
      <div className='text-lg'>
      <p className='font-semibold'>  {user?.name}</p>
        <p>{user.email}</p>
      </div>
    </Link>
  )
}

export default UserSearchCard
