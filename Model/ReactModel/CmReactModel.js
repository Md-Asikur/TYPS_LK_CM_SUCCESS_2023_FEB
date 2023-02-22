import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
const reactSchema = new mongoose.Schema({
  react: {
    type: String,
    enum: ["like", "love", "haha", "sad", "angry", "wow"],
    required: true,
  },
  postRef: {
    type: ObjectId,
    ref: "comment",
  },
  reactBy: {
    type:ObjectId,
    ref: "user",
  },
});

const postReactCommentModel = mongoose.model("ReactComment", reactSchema);
export default postReactCommentModel;
