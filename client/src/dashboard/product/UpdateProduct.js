import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { CLEAR_ERRORS } from "../../constants/userConstants";
import { toast } from "react-toastify";
import { createProduct, getAllProducts, getProductDetails, updateProduct } from "../../actions/productAction";
import { PRODUCT_CLEAR_ERRORS } from "../../constants/productConstants";
import { clearHistory } from "../../reducers/userReducer";

function UpdateProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
    const { isUpdated,error } = useSelector((state) => state.updDelProduct);
  const { product: products } = useSelector((state) => state.productDetails);
  const categories = useSelector((state) => state.category);
  const [product, setProducts] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    quantity:""
  });
    const productId = useParams().id;
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
   const [quantity, setQuantity] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  // const categories = [
  //   "Laptop",
  //   "Footwear",
  //   "Bottom",
  //   "Tops",
  //   "Attire",
  //   "Camera",
  //   "SmartPhones",
  // ];
  

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
      formData.set("description", description);
    formData.set("price", price);
    formData.set("category", category);
    formData.set("stock", stock);
     formData.set("quantity", quantity);

    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(updateProduct(productId, formData));
  };
  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const files = Array.from(e.target.files);
setOldImages([]);
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
      dispatch(getProductDetails(productId));
      if (productId) {
        console.log(products);
        setName(products?.name);
        setDescription(products?.description);
        setPrice(products?.price);
        setCategory(products?.category);
        setStock(products?.stock);
        setQuantity(products?.quantity);
        setOldImages(products?.images);
      }

      if (error) {
        toast.warning(error);

        dispatch({ type: PRODUCT_CLEAR_ERRORS });
      }
      if (isUpdated?.success === true) {
        toast.success("Product Updated Successfully!");

        navigate("/admin/all-products");
        dispatch({ type: PRODUCT_CLEAR_ERRORS });
        dispatch(getAllProducts());
      }
    }, [
      isAuthenticated,
      alert,
      error,
      isUpdated?.success,
      toast,
      dispatch,
      productId,
      products?.category,
      products?.name,
      products?.description,
      products?.price,
      products?.stock,
      products?.quantity,
    ]);
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
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              placeholder="Enter Description"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              cols="30"
              rows="1"
              required
              style={{ height: "100px" }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Price"
              name="price"
              onChange={(e) => setPrice(e.target.value)}
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
              onChange={(e) => setStock(e.target.value)}
              value={stock}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Quantity"
              name="quantity"
              onChange={(e) => setQuantity(e.target.value)}
              value={quantity}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label></Form.Label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
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
            {oldImages?.map((av) => {
              return (
                <>
                  {" "}
                  <img
                    src={av.url}
                    alt="avatar"
                    style={{
                      width: "50px",
                      height: "50px",
                      display: "block",
                      overflow: "scroll",
                    }}
                  />
                  <span onClick={() => setOldImages([])}>cut</span>
                </>
              );
            })}
            {imagesPreview?.map((av) => {
              return (
                <>
                  {" "}
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
                  <span onClick={() => setOldImages([])}>cut</span>
                </>
              );
            })}
            <Form.Control
              type="file"
              name="avatar"
              accept="image/*"
              onChange={registerDataChange}
              multiple
            />
          </Form.Group>

          <p>
            go to dashboard?<Link to="/dashborad">Dashborad</Link>
          </p>
          <Button variant="primary" type="submit">
            Update Product
          </Button>
        </Form>
      </div>
    </>
  );
}

export default UpdateProduct;
