import axios from 'axios'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Home = () => {
const fetchUserDetails = async () => {
  try {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user-details`
    const response = await axios({
      url: URL,
      withCredentials: true
    })
    console.log("current user details", response.data);

  } catch (error) {
       console.error("error: ", error)
  }
}
React.useEffect(() => {
  fetchUserDetails();
},[])
  return (
    <div>
      Home

      {/* Message component */}
      <section>
            <Outlet/>
      </section>
    </div>
  )
}

export default Home
