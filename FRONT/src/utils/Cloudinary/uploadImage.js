import axios from "axios";

const uploadImageToCloudinary = async (event, ref) => {
  const CLOUDINARY_URL =
    "https://api.cloudinary.com/v1_1/dqh54oxva/image/upload";
  const CLOUDINARY_UPLOAD_PRESET = "fwhqgl70";

  const max_size = 10372672;
  const file = event.target.files[0];

  if (file.size > max_size) {
    console.log("Max size for files: 10 MB");
    return;
  } else {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const res = await axios.post(CLOUDINARY_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress(e) {
        const progress = (e.loaded * 100) / e.total;
        ref.current.setAttribute("value", progress);
      },
    });

    return res.data.secure_url ? res.data.secure_url : res.data.url;
  }
};

export default uploadImageToCloudinary;
