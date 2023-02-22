import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./register.css";
import { register } from "../../actions/userAction";
import { CLEAR_ERRORS } from "../../constants/userConstants";
import { toast } from "react-toastify";
function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated,error,created } = useSelector((state) => state.user);
  const [users, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState("")
  const [avatarPreview, setAvatarPreview] = useState("");
  const { name, email, password } = users;
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
      formData.set("avatar", avatar);
    dispatch(register(formData))
  };
  const registerDataChange = (e) => {
    if (e.target.name==="avatar") {
      const reader = new FileReader()
       reader.onload = () => {
         if (reader.readyState === 2) {
           setAvatarPreview(reader.result);
           setAvatar(reader.result);
         }
       };

       reader.readAsDataURL(e.target.files[0]);
    } else {
       setUser({ ...users, [e.target.name]: e.target.value });
    } 
   
  }
  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/account");
     
    }
     if (error) {
       toast.warning(error);
      
       dispatch({ type: CLEAR_ERRORS });
    }
    if (created===true) {
      toast.success("User Created Successfully!");

      dispatch({ type: CLEAR_ERRORS });
    }
  }, [isAuthenticated, alert, error,created,toast]);
  return (
    <>
      <div className="register">
        <Form encType="multipart/form-data" onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              name="name"
              onChange={registerDataChange}
              value={name}
              required
            />
          </Form.Group>
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
          <Form.Group className="mb-3" controlId="formBasicFile">
            <Form.Label>Photo</Form.Label>
            <img src={avatarPreview} alt="avatar" style={{width:"50px",height:"50px",display:"block"}}/>
            <Form.Control
              type="file"
            
              name="avatar"
              onChange={registerDataChange}
              accept="image/*"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" required />
          </Form.Group>
          <p>
            {" "}
            already have an account?<Link to="/login">login</Link>
          </p>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Register;
