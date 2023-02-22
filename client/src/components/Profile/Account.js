import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from 'react-router-dom'
import { logoutAction } from '../../actions/userAction'
import "./account.css"
const Account = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
   const { userDetails } = useSelector((state) => state.userDetails);
 
 
  return (
    <>
     
      <div className="account">
        <div>
          <img src={user?.avatar?.url} alt={user?.name} />
        </div>
        <div>
          <h3>
            <b>UserId:</b> {user?._id}
          </h3>
          <h3>
            <b>Email:</b> {user?.email}
          </h3>
          <h3>
            <b>Name:</b> {user?.name}
          </h3>
          <h3>
            <b>Email:</b> {user?.email}
          </h3>
          <h3>
            <b>Role:</b> {user?.role}
          </h3>
          <Link to="/user/update">Update User</Link>
          <br/>
          <Link to="/update/password">Update Password</Link>
        </div>
      </div>
    </>
  );
}

export default Account