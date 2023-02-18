import axios from "axios";

const uploadImageToCloudinary = async (folder, file, ref) => {
  const CLOUDINARY_URL =
    "https://api.cloudinary.com/v1_1/dqh54oxva/image/upload";

  const max_size = 10372672;

  if (file.size > max_size) {
    console.error("Max size for files: 10 MB");
    return;
  } else {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", folder);

    const res = await axios.post(CLOUDINARY_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress(e) {
        const progress = (e.loaded * 100) / e.total;
        ref
          ? ref.current.setAttribute("value", progress)
          : console.log(progress);
      },
    });
    return res.data.secure_url ? res.data.secure_url : res.data.url;
  }
};

export default uploadImageToCloudinary;
