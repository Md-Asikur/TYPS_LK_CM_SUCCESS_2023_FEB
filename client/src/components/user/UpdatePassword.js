import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./register.css";
import {
  clearHistoryAction,
  loadUser,
  register,
  updatePassword,
  updateProfile,
  updateProfilePic,
} from "../../actions/userAction";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
function UpdatePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { isUpdated, isUpdatedPic, loading,error } = useSelector((state) => state.updateUser);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  useEffect(() => {
   
    if (isUpdated === true) {
      navigate("/account");
      dispatch(loadUser());
      dispatch(clearHistoryAction());
    }
    if (error) {
      alert(error)
    }
  }, [user, isUpdated,error]);

  const onSubmit = (e) => {
    e.preventDefault();

   
    const formData = new FormData();

    formData.set("oldPassword", oldPassword);
    formData.set("newPassword", newPassword);
    formData.set("confirmPassword", confirmPassword);
  
    dispatch(updatePassword(formData));
  };
  

  return (
    <>
      <div className="register">
        <Form encType="application/json" onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Old Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Old Password"
              name="oldPassword"
              onChange={(e) => setOldPassword(e.target.value)}
              value={oldPassword}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter New Password"
              name="newPassword"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Confirm Password"
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              required
            />
          </Form.Group>

          <p>
            {" "}
            go to your account?<Link to="/account">acount</Link>
          </p>
          <Button variant="primary" type="submit">
            Update Password
          </Button>
        </Form>
      </div>
    </>
  );
}

export default UpdatePassword;
