import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
    const { _id,name,description,price, stock,category,images} = product;
  return (
    <>
      <Link to={`/product/${_id}`} style={{ listStyle: "none", textDecoration: "none" }}>
        <Card style={{ width: "25rem", height: "500px", margin: "10px 80px"}}>
          <Card.Img
            variant="top"
            src={images[0]?.url}
            style={{ width: "100%", height: "320px" }}
          />
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
              {description.slice(0, 100)} <span style={{color:"green"}}> See More</span>
            </Card.Text>
            <Button style={{ padding: "5px 15px", margin: "0px 15px" }} variant="warning">
              Price: {price}
            </Button>
            <Button style={{ padding: "5px 15px", margin: "0px 15px" }} variant="primary">
              Buy Now
            </Button>
          </Card.Body>
        </Card>
      </Link>
    </>
  );
}

export default ProductCard;
