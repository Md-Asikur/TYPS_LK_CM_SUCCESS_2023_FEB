import axios from "axios";

const Upload = async (image) => {
  const data = new FormData();
  data.append("image", image);
  data.append("upload_preset", "Chat__app2023_success");
  
  try {
    const res = await axios.post("https://api.cloudinary.com/v1_1/asikur/upload", data);

    const { url } = res.data;
    console.log(res.data)
    return url;
  } catch (err) {
    console.log(err);
  }
};

export default Upload;
