import express from "express"
import { reactPostComment, getReactsComment, getReactsCommentUnauth } from "../../controller/React/CmReactCtrl.js"

import { isAuthenticatedUser } from "../../utils/auth.js"
const router = express.Router()
router.put("/react-comment", reactPostComment);
router.get("/get-react-comment/:id", isAuthenticatedUser, getReactsComment);
router.get("/get-react-comment-unauth/:id",  getReactsCommentUnauth);
export default router;
