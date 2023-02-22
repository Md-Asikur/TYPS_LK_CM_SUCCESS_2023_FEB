import { Fragment, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getallUsersAction } from "../actions/userAction";
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";



import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LaunchIcon from "@mui/icons-material/Launch";
import { Avatar } from "@mui/material";
import axios from "axios";
import Button from "react-bootstrap/Button";
function AllCategory() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.allUsers);
  
  
  const deleteUserHandler = (id) => {
      dispatch(deleteUser(id));
      
  };
  useEffect(() => {
    dispatch(getallUsersAction());

   
   
  }, []);

 

  
  
  return (
    <>
      <div style={{ display: "flex" }}>
        <div>
          <Sidebar />
        </div>
        <div style={{ width: "100%" }}>
          <div className="productListContainer">
            <h1 id="productListHeading">ALL Cat Test{users?.users?.length}</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>avatar</th>
                  <th>role</th>
                  <th>actions</th>
                </tr>
              </thead>
              <tbody>
                              {users?.users?.map((user, key) => {
                   return (
                     <>
                       {" "}
                       <tr>
                         <td>{user?._id}</td>
                         <td>{user?.name}</td>
                         <td>{user?.email}</td>
                         <td>
                           <img
                             src={user?.avatar?.url}
                             alt={user?.name}
                             style={{ height: "30px", width: "30px" }}
                           />
                         </td>
                         <td>{user?.role}</td>
                         <td>
                           <EditIcon  />
                           <DeleteIcon  />
                         </td>
                       </tr>
                     </>
                   );
               })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllCategory;
