import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./register.css";
import { clearHistoryAction, loadUser, register, updateProfile, updateProfilePic } from "../../actions/userAction";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
function UpdateUser() {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { user } = useSelector((state) => state.user);
   const { isUpdated, isUpdatedPic,loading } = useSelector((state) => state.updateUser);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
 
  
    useEffect(() => {
        if (user) {
            setAvatarPreview(user?.avatar?.url);
            setName(user.name)
            setEmail(user.email);
      }
      if (isUpdated === true && isUpdatedPic === true) {
        navigate("/account");
        dispatch(loadUser());
        dispatch(clearHistoryAction());
      }
      
      
    }, [user,isUpdated,isUpdatedPic]);
    
  const onSubmit = (e) => {
    e.preventDefault();
   
    // if (avatar) {
    //   const formData = new FormData();
    //   formData.set("avatar", avatar);
    //   dispatch(updateProfilePic(formData));
    // } else {
    //   const formData = new FormData();
    //   formData.set("name", name);
    //   formData.set("email", email);
    //   dispatch(updateProfile(formData));
    // }
    
   
    
      const formData = new FormData();
     
       formData.set("name", name);
       formData.set("email", email);
       formData.set("avatar", avatar);
       dispatch(updateProfile(formData));
       dispatch(updateProfilePic(formData));
   
    
   
  };
   const registerDataChange = (e) => {
     if (e.target.name === "avatar") {
       const reader = new FileReader();
       reader.onload = () => {
         if (reader.readyState === 2) {
           setAvatarPreview(reader.result);
           setAvatar(reader.result);
         }
       };

       reader.readAsDataURL(e.target.files[0]);
     }
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

          <Form.Group className="mb-3" controlId="formBasicFile">
            <Form.Label>Photo</Form.Label>

            <div className="info_avatar">
              <img src={avatarPreview} alt="avatar" />

              <span>
                <AddAPhotoIcon className="i" />
                <p>Change</p>
                <input
                  type="file"
                  accept="image/*"
                  name="avatar"
                  id="file_up"
                  onChange={registerDataChange}
                />
              </span>
            </div>
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

export default UpdateUser;
