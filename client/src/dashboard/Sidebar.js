import React from "react";
import "./sidebar.css";

import { Link } from "react-router-dom";

import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import CategoryIcon from "@mui/icons-material/Category";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import AddIcon from "@mui/icons-material/Add";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        <img src="" alt="Ecommerce" />
      </Link>
      <Link to="/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <Link to="/admin/create">
        <p>
          <AddIcon /> Create Product
        </p>
      </Link>
      <Link to="/admin/all-products">
        <p>
          {" "}
          <BorderAllIcon />
          All-Products
        </p>
      </Link>
      <Link to="/admin/category">
        <p>
          <CategoryIcon />
          Category
        </p>
      </Link>
      <Link to="/admin/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to="/admin/all-users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
