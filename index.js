import express from "express";
import bodyparser from "body-parser";
import cors from "cors";
import cookieparser from "cookie-parser";
import fileupload from "express-fileupload";

import userRouter from "./router/userRouter.js";
import productRouter from "./router/productRouter.js";
import categoryRouter from "./router/categoryRouter.js";
import commentRouter from "./router/commentRouter.js";
import postReactRouter from "./router/React/reactPostRouter.js";
import commentReactRouter from "./router/React/reactCmRouter.js";
import conversationsRouter from "./router/message/conversation.route.js";
import messageRouter from "./router/message/message.route.js";

import { error } from "./utils/error.js";
import path from "path";
const __dirname = path.resolve();
const app = express()

app.use(error);
app.use(express())
app.use(express.json({ limit: "500mb" }));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false}));
app.use(fileupload());
app.use(
  cors({
    origin: "http://localhost:3000" || "https://sore-hare-cloak.cyclic.app",
    credentials: true,
  })
);
app.use(cookieparser())

app.use("/api/v1", userRouter);
app.use("/api/v1", productRouter);
app.use("/api/v1", categoryRouter);
app.use("/api/v1", commentRouter);
app.use("/api/v1", postReactRouter);
app.use("/api/v1", commentReactRouter);
app.use("/api/v1", conversationsRouter);
app.use("/api/v1", messageRouter);
// //hosting
 app.use(express.static(path.join(__dirname, "./client/build")));

 app.get("*", (req, res) => {
   res.sendFile(path.resolve(__dirname, "./client/build/index.html"));
 });
app.use(error)
export default app;