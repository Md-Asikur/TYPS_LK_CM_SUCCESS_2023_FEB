import React from 'react'
import { Link } from 'react-router-dom';
import "./dashboard.css"
import Sidebar from './Sidebar';
const Dashboard = () => {
  return (
    <>
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-left"></div>
        <div className="dashboard-right">
          <div className="dashboardSummaryBox2">
            <div>
              <Link to="/admin/all-products">
                <p>Al-Product</p>
                <p>42897</p>
              </Link>
            </div>
            <div>
              <Link to="/admin/orders">
                <p>All-Orders</p>
                <p>7883</p>
              </Link>
            </div>
            <div>
              <Link to="/admin/all-users">
                <p>All-Users</p>
                <p>446</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard