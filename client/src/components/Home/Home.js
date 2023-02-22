import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllProducts } from "../../actions/productAction";
import ProductCard from "../../dashboard/product/ProductCard";
import "./home.css";
const Home = () => {
  // const categories = [
   
  //   "Laptop",
  //   "Footwear",
  //   "Bottom",
  //   "Tops",
  //   "Attire",
  //   "Camera",
  //   "SmartPhones",
  // ];
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.allProducts);
   const categories = useSelector((state) => state.category);
  const [category, setCategory] = useState();
  const [Search, setSearch] = useState("");
  const [sort, setSort] = useState("");
 
  useEffect(() => {
    dispatch(getAllProducts(Search,sort,category));
  }, [dispatch, Search,sort,category]);

  return (
    <>
      <div className="search">
        <span>Search: </span>
        <div>
          <input
            type="text"
            name="Search"
            value={Search}
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>

        <div className="sort">
          <div>
            <span>Sort:</span>
            <select value={sort} onChange={(e) => setSort(e.target.value.toLowerCase())}>
              <option value="">Newest</option>

              <option value="name">Name</option>
              <option value="-price">Price</option>

              <option value="-stock">Stock</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
      </div>

      <ul
        className="categoryBox"
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          justifyContent: "start",
          position: "fixed",
          padding: "10px 30px",
        }}
      >
        <span
          style={{
            fontSize: "18px",
            fontWeight: "600",
            fontFamily: "cursive",
            marginLeft: "-20px",
          }}
          onClick={() => setCategory("")}
        >
          Categories:
        </span>
        {categories &&
          categories.map((category, index) => (
            <>
              {" "}
              <li
                className="category-link"
                key={index}
                onClick={() => setCategory(category?.name)}
              >
                {category?.name}
              </li>
            </>
          ))}
      </ul>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {products?.map((product) => {
          return <ProductCard key={product._id} product={product} />;
        })}
      </div>
    </>
  );
};

export default Home;
