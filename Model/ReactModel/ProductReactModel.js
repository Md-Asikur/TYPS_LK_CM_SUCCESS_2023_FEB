import mongoose from"mongoose"

const { ObjectId } = mongoose.Schema;

const reactSchema = new mongoose.Schema({
  react: {
    type: String,
    enum: ["like", "love", "haha", "sad", "angry", "wow"],
    required: true,
  },
  postRef: {
    type: ObjectId,
    ref: "product",
  },
  reactBy: {
    type: ObjectId,
    ref: "user",
  },
});

const postReactModel= mongoose.model("React", reactSchema);
export default postReactModel