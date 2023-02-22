
import User from "../Model/UserModel.js";
import bcrypt from "bcrypt"
import sendToken from "../utils/getGwtToken.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "cloudinary"
 export const register = async(req,res,next) => {
   try {
     const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
       folder:"asikur_avatars"
     })
         const { name, email, password } = req.body;
          const Exists = await User.findOne({ email })
          if (Exists) {
            return next(new ErrorHandler("User Exists", 401));
          }
         //const hashp=await bcrypt.hash(password,14)
         const user = await User.create({
           name,
           email,
           password,
            //  password:hashp,
             avatar: {
                 public_id: myCloud.public_id,
                 url:myCloud.secure_url
           }
         });
         sendToken(user,201,res)
    // return res.status(201).json({ msg: "User Created",user });
    } catch (error) {
        return res.status(500).json({msg:"Interanl Server Error"})
    }
}
export const login = async (req, res,next) => {
  try {
      const { email, password } = req.body;
      if (!email || !password) {
        //  return next(new ErrorHandler("Please Enter Email & Password", 400));
         return res.status(500).json({ msg: "Please Enter Email & Password" });
      }
      const user = await User.findOne({ email }).select("+password")
       if (!user) {
         return res.status(400).json({ msg: "User Not Found" });
       }
      // const hashp = await bcrypt.compare(password,user.password);
    const hashp = await user.comparePassword(password);
      if (!hashp) {
       return res.status(400).json({ msg: "Incorrect Password" });
      }
       sendToken(user, 200, res);
    //  res.status(200).json({ msg: "User Login Successfully", user });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
export const userDetails = async (req, res, next) => {
  try {
   
    const user = await User.findById(req.user.id)
    if (!user) {
      return res.status(400).json({ msg: "User Not Found" });
    }
   
    sendToken(user, 200, res);
    //  res.status(200).json({ msg: "User Login Successfully", user });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
// Logout User
export const logout =async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
};
export const allUsers = async (req, res, next) => {
  
  try {
    const users = await User.find().sort("-createdAt")
    res.status(200).json({ msg: "All Users", users });
} catch (error) {
   return res.status(500).json({ msg: "Internal Server Error" });
}
};
//update part
// update User Profile
export const updateProfile = async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };


  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
};
export const updateProfilePic = async (req, res, next) => {
  const newUserData = {};

  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "asikur_avatars",
    
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
};
//update ppassword
// update User password
export const updatePassword =async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
};
// Get single user (admin)
export const getSingleUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`));
  }

  res.status(200).json({
    success: true,
    user,
  });
};
// Delete User --Admin
export const deleteUser =async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400));
  }

  const imageId = user.avatar.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
};
// update User Role -- Admin
export const updateUserRole =async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
};