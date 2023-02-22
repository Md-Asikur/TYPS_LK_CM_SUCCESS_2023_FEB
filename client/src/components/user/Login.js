import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { login } from "../../actions/userAction";
function Login() {
     const navigate = useNavigate();
     const dispatch = useDispatch();
     const { user, isAuthenticated } = useSelector((state) => state.user);
   
  
    const [users, setUser] = useState({
      name: "",
      email: "",
     
    });
    const {email, password } = users;
    const onSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData();
     
      formData.set("email", email);
      formData.set("password", password);
      dispatch(login(formData));
    };
    const registerDataChange = (e) => {
      e.preventDefault();
      setUser({ ...users, [e.target.name]: e.target.value });
  };
  useEffect(() => {
   
    if (isAuthenticated === true) {
      navigate("/account")
    }
  }, [isAuthenticated])
  
  return (
    <>
      <div className="login">
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={registerDataChange}
              value={email}
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={registerDataChange}
              value={password}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" required />
          </Form.Group>
          <p>
            {" "}
            don't have an account?<Link to="/register">register</Link>
          </p>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Login;
