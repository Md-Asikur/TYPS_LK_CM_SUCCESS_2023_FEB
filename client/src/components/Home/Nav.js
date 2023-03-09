import { useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutAction } from "../../actions/userAction";

function Navbar() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
   useEffect(() => {
    
   }, [isAuthenticated]);
  const logout = () => {
    dispatch(logoutAction());
    navigate("/");
  };
  return (
    <>
      <div>
        <Nav
          variant="pills"
          defaultActiveKey="/"
          className="justify-content-end"
          style={{ padding: "30px 20px 20px 10px" }}
        >
          <Nav.Item>
            <Nav.Link href="/" style={{ color: "#000", textDecoration: "none" }}>
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="/account">
              <Link to="/account" style={{ color: "#000", textDecoration: "none" }}>
                Account
              </Link>
            </Nav.Link>
          </Nav.Item>
          {isAuthenticated === false ? (
            <>
              {" "}
              <Nav.Item>
                <Nav.Link eventKey="/register">
                  <Link to="/register" style={{ color: "#000", textDecoration: "none" }}>
                    {" "}
                    Register
                  </Link>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="/login">
                  <Link to="/login" style={{ color: "#000", textDecoration: "none" }}>
                    {" "}
                    Login
                  </Link>
                </Nav.Link>
              </Nav.Item>
            </>
          ) : (
            <>
              <Nav.Item>
                <Nav.Link eventKey="/dashboard">
                  <Link to="/dashboard" style={{ color: "#000", textDecoration: "none" }}>
                    {" "}
                    Dashboard
                  </Link>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="/messages">
                  <Link to="/messages" style={{ color: "#000", textDecoration: "none" }}>
                    {" "}
                    Messages
                  </Link>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="/cart">
                  <Link
                    to="/cart"
                    style={{
                      color: "#000",
                      textDecoration: "none",
                      position: "relative",
                    }}
                  >
                    {" "}
                    Cart
                    {cartItems?.length > 0 && (
                      <span
                        style={{
                          position: "absolute",
                          top: "-10px",
                          right: "-14px",
                          color: "white",
                        }}
                      >
                        {cartItems?.length}
                      </span>
                    )}
                  </Link>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="/logout">
                  <a style={{ color: "#000", textDecoration: "none" }} onClick={logout}>
                    {" "}
                    Logout
                  </a>
                </Nav.Link>
              </Nav.Item>
            </>
          )}
        </Nav>
      </div>
    </>
  );
}

export default Navbar;
