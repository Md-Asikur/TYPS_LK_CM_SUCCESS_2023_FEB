import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { getCategories } from "./actions/categoryAction";
import { getAllProducts } from "./actions/productAction";
import { getallUsersAction, loadUser } from "./actions/userAction";
import Home from "./components/Home/Home";
import Navbar from "./components/Home/Nav";
import Message from "./components/message/Message";
import Messages from "./components/messages/Messages";
import Account from "./components/Profile/Account";
import OtherInfo from "./components/Profile/OtherInfo";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import UpdatePassword from "./components/user/UpdatePassword";
import UpdateRole from "./components/user/UpdateRole";
import UpdateUser from "./components/user/UpdateUser";
import AllUsers from "./dashboard/AllUsers";
import AllCategory from "./dashboard/Category";
import Category from "./dashboard/category/Category.js";
import Dashboard from "./dashboard/Dashboard";
import AllProducts from "./dashboard/product/AllProducts";
import CreateProduct from "./dashboard/product/CreateProduct";
import { ProductDetails } from "./dashboard/product/ProductDetails";
import UpdateProduct from "./dashboard/product/UpdateProduct";




function App() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(loadUser())
    dispatch(getallUsersAction());
    dispatch(getAllProducts())
      dispatch(getCategories());
  }, [dispatch])
  
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:keyword" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/:id" element={<OtherInfo />} />
          <Route path="/otherinfo/:id" element={<OtherInfo />} />
          <Route path="/user/update" element={<UpdateUser />} />
          <Route path="/update/password" element={<UpdatePassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/all-users" element={<AllUsers />} />
          <Route path="/admin/update/user-role/:id" element={<UpdateRole />} />
          <Route path="/admin/all-category" element={<AllCategory />} />
          <Route path="/admin/create" element={<CreateProduct />} />
          <Route path="/admin/all-products" element={<AllProducts />} />
          <Route path="/admin/update/product/:id" element={<UpdateProduct />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          {/* Category */}
          <Route path="/admin/category" element={<Category />} />
          {/* Category */}
          {/* Message part */}

          <Route path="/messages" element={<Messages />} />
          <Route path="/message/:id" element={<Message/>} />
          {/* Message part */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
