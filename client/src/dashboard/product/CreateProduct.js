import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { CLEAR_ERRORS } from "../../constants/userConstants";
import { toast } from "react-toastify";
import { createProduct } from "../../actions/productAction";
import { PRODUCT_CLEAR_ERRORS } from "../../constants/productConstants";
import { clearHistory } from "../../reducers/userReducer";

function CreateProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { created, error } = useSelector((state) => state.products);
   const categories = useSelector((state) => state.category);
  const [product, setProducts] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [category, setCategory] = useState();
  // const categories = [
  //   "Laptop",
  //   "Footwear",
  //   "Bottom",
  //   "Tops",
  //   "Attire",
  //   "Camera",
  //   "SmartPhones",
  // ];
  const { name, description, price, stock } = product;

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("description", description);
    formData.set("price", price);
    formData.set("category", category);
    formData.set("stock", stock);

    images.forEach((image) => {
      formData.append("images", image);
    });
    
    dispatch(createProduct(formData));
  };
  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const files = Array.from(e.target.files);

      setImages([]);
      setImagesPreview([]);
      files.forEach((file) => {
        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {
            setImagesPreview((old) => [...old, reader.result]);
            setImages((old) => [...old, reader.result]);
          }
        };

        reader.readAsDataURL(file);
      });
    } else {
      setProducts({ ...product, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
    if (error) {
      toast.warning(error);

      dispatch({ type: PRODUCT_CLEAR_ERRORS });
    }
    if (created === true) {
      toast.success("Product Created Successfully!");
     
      navigate("/admin/all-products");
      dispatch({ type: PRODUCT_CLEAR_ERRORS });
    }
    
  }, [isAuthenticated, alert, error, created, toast, dispatch]);
  return (
    <>
      <div className="register">
        <Form encType="multipart/form-data" onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              onChange={registerDataChange}
              value={name}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Description"
              name="description"
              onChange={registerDataChange}
              value={description}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Price"
              name="price"
              onChange={registerDataChange}
              value={price}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Stock"
              name="stock"
              onChange={registerDataChange}
              value={stock}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label></Form.Label>
            <select onChange={(e) => setCategory(e.target.value)} required>
              <option value="">Choose Category</option>
              {categories &&
                categories?.map((cate, index) => {
                  return (
                    <option key={cate?._id} value={cate?.name}>
                      {cate?.name}
                    </option>
                  );
                })}
            </select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicFile">
            <Form.Label>Product Image</Form.Label>
            {imagesPreview?.map((av) => {
              return (
                <img
                  src={av}
                  alt="avatar"
                  style={{
                    width: "50px",
                    height: "50px",
                    display: "block",
                    overflow: "scroll",
                  }}
                />
              );
            })}

            <Form.Control
              type="file"
              name="avatar"
              accept="image/*"
              onChange={registerDataChange}
              multiple
             required
            />
          </Form.Group>

          <p>
            go to dashboard?<Link to="/dashborad">Dashborad</Link>
          </p>
          <Button variant="primary" type="submit">
            Create Product
          </Button>
        </Form>
      </div>
    </>
  );
}

export default CreateProduct;
