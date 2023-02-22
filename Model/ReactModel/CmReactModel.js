import mongoose from "mongoose";



const cmreactSchema = new mongoose.Schema({
  react: {
    type: String,
    enum: ["like", "love", "haha", "sad", "angry", "wow"],
    required: true,
  },
  postRef: {
    type: mongoose.Schema.ObjectId,
    ref: "comment",
  },
  reactBy: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
});

const commentReactModel = mongoose.model("commentReact", cmreactSchema);
export default commentReactModel;