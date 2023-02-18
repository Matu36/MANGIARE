import React, { useRef } from "react";
import s from "../UploadImage/UploadImage.module.scss";
import axios from "axios";
import uploadImageToCloudinary from "../../utils/Cloudinary/uploadImage";

export default function UploadImage() {
  const imgPreviewRef = useRef(null);
  const imgProgressBarRef = useRef(null);

  const handleInputChange = async (e) => {
    let url = await uploadImageToCloudinary(e, imgProgressBarRef);
    imgPreviewRef.current.src = url;
  };

  const testingGet = async () => {
    const res = await axios.get(
      "https://api.cloudinary.com/v1_1/dqh54oxva/resources/image"
    );
    console.log(res);
  };

  return (
    <div className={s.container}>
      <div className={s.card}>
        <img ref={imgPreviewRef} id="img-preview" />
        <div className={s.cardFooter}>
          <input
            type="file"
            id="img-uploader"
            onChange={(e) => handleInputChange(e)}
          />
          <progress
            ref={imgProgressBarRef}
            id="imgProgressBar"
            value="0"
            max="100"
            className={s.progressBar}
          />
          <button onClick={testingGet}>GET IMAGES</button>
        </div>
      </div>
    </div>
  );
}
