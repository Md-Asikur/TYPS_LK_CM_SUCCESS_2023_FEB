import ErrorHander from "./errorHandler.js";

import jwt from "jsonwebtoken";
import User from "../Model/UserModel.js";


export const isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);

  req.userId = decodedData.id;
  req.isActiveUser = req.user.isActiveUser;
  req.avatar = req.user.avatar.url
    //  console.log(req.isActiveUser);
    next();
  //test
  // jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
  //   if (err) return next(ErrorHander(403, "Token is not valid!"));
  //   req.userId = payload.id;
  //   console.log(req.userId)
  //   next();
  // });
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHander(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};
