import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./register.css";
import { clearHistoryAction, getUserDetails, loadUser, updateUserRole } from "../../actions/userAction";
import { toast } from "react-toastify";


function UpdateRole() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { loading, error, userDetails } = useSelector((state) => state.userDetails);
   const { isUpdated} = useSelector((state) => state.updateUser);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const userId = useParams().id;

  useEffect(() => {
    if (userId) {
      dispatch(getUserDetails(userId));
      setName(userDetails?.name);
      setEmail(userDetails?.email);
      setRole(userDetails?.role);
    }

    if (error) {
      alert(error);
      dispatch(clearHistoryAction());
    }

    // if (updateError) {
    //   alert(updateError);
    //   dispatch(clearErrors());
    // }

    if (isUpdated===true) {
      toast.success("User Updated Successfully");
       navigate("/admin/all-users");
      dispatch(clearHistoryAction());
    }
  }, [
    dispatch,
    userId,
    userDetails?.name,
    userDetails?.email,
    userDetails?.role,
    alert,
    error,
    navigate,
    isUpdated,
    
  ]);

  const onSubmit = (e) => {
    e.preventDefault();

   

    const formData = new FormData();

    formData.set("name", name);
    formData.set("email", email);
    formData.set("role", role);
   
    dispatch(updateUserRole(userId,formData));
  };
  

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
              onChange={(e) => setName(e.target.value)}
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
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">Choose Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="disabled">Disabled</option>
            </select>
          </Form.Group>

          <p>
            {" "}
            go to your account?<Link to="/account">acount</Link>
          </p>
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </div>
    </>
  );
}

export default UpdateRole;
