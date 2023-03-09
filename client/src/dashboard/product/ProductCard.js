import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addItemsToCart } from "../../actions/cartAction";

function ProductCard({ product }) {
  const navigate = useNavigate()
  const dispatch=useDispatch()
 let { _id, name, description, price, stock, category, images,quantity } = product;
  const addToCartHandler = () => {
    dispatch(addItemsToCart(_id,quantity=1));
    toast.success("Item Added To Cart");
    navigate("/cart");
  };
  return (
    <>
     
      <Card style={{ width: "25rem", height: "500px", margin: "10px 80px" }}>
         <Link to={`/product/${_id}`} style={{ listStyle: "none", textDecoration: "none" }}>
          <Card.Img
            variant="top"
            src={images[0]?.url}
            style={{ width: "100%", height: "320px" }}
        />
              </Link>
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
              {description.slice(0, 100)} <span style={{color:"green"}}> See More</span>
            </Card.Text>
            <Button style={{ padding: "5px 15px", margin: "0px 15px" }} variant="warning">
              Price: {price}
            </Button>
            <Button style={{ padding: "5px 15px", margin: "0px 15px" }} variant="primary"
            onClick={addToCartHandler}>
              Buy Now
            </Button>
          </Card.Body>
        </Card>

    </>
  );
}

export default ProductCard;
