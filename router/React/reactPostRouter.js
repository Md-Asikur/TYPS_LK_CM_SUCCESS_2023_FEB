import express from "express"
import { reactPost, getReacts, getReactsUnauth } from "../../controller/React/PostReactCtrl.js"
import { isAuthenticatedUser } from "../../utils/auth.js"
const router = express.Router()
router.put("/react-post", isAuthenticatedUser, reactPost)
router.get("/get-react-post/:id", isAuthenticatedUser, getReacts);
router.get("/get-react-post-unauth/:id", getReactsUnauth);
export default  router;