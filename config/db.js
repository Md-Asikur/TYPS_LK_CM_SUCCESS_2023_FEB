import mongoose from "mongoose";

mongoose.set("strictQuery", false);
const connectionDb = () => {
  mongoose.connect(process.env.MONGODB_URL, (err) => {
    if (err) throw err;
    console.log("Mongodb connection");
  });
}
  export default connectionDb
  