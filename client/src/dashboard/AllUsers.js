import { Fragment, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { clearHistoryAction, deleteUser, getallUsersAction } from "../actions/userAction";
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";
//import { AccordionDetails, Button } from "@material-ui/core";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LaunchIcon from "@mui/icons-material/Launch";
import { Avatar } from "@mui/material";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
function AllUsers() {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  
   const { users } = useSelector((state) => state.allUsers);
  const { isDeleted } = useSelector((state) => state.updateUser);
  
    const [user,setUser]=useState()
    console.log("user", user)
      const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));
      };
    useEffect(() => {
      dispatch(getallUsersAction());
      if (isDeleted === true) {
        toast.success("user deleted successfully")
      navigate("/admin/all-users")
      }
      
      //setUser(users);
      //AllUsers();
    }, [dispatch,isDeleted]);
   
  // const AllUsers = async () => {
  //  const res = await axios.get(`/api/v1/all-users`);
  //  console.log(res.data);
  //  setUser(res.data);
  //   };
    
  const columns = [
    {
      field: "avatar",
      headerName: "Avatar",
      minWidth: 200,
      flex: 1,
      renderCell: (params) => {
        return params.getValue(params.id, "avatar", <Avatar url={params?.avatar?.url} />);
      },
    },
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },

    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "user" ? "greenColor" : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/update/user-role/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              variant="light"
              onClick={() => deleteUserHandler(params.getValue(params.id, "id"))}
            >
              <DeleteIcon />
            </Button>
            <Link to={`/otherinfo/${params.getValue(params.id, "id")}`}>
              <LaunchIcon />
            </Link>
          </Fragment>
        );
      },
    },
  ];


    const rows = [];

  
   users?.users &&
     users?.users.forEach((item) => {
       rows.push({
         avatar: <Avatar src={item?.avatar?.url} />,
         id: item._id,
         role: item.role,
         email: item.email,
         name: item.name,
       });
     });
  return (
    <>
      <div style={{ display: "flex" }}>
        <div>
          <Sidebar />
        </div>
        <div style={{ width: "100%" }}>
          <div className="productListContainer">
            <h1 id="productListHeading">
              ALL Users <span style={{color:"greenyellow"}}>({users?.users?.length})</span>
            </h1>

            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={8}
              disableSelectionOnClick
              // className="productListTable"
              autoHeight
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AllUsers;
