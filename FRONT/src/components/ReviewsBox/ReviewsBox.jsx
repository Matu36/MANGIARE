import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getReviews, postReview } from "../../Redux/actions/reviews";
import uploadImageToCloudinary from "../../utils/Cloudinary/uploadImage";
import ReviewsCard from "../ReviewsCard/ReviewsCard.jsx";
import s from "./ReviewsBox.module.scss";

const ReviewsBox = () => {
  let { id } = useParams();
  let dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews);
  useEffect(() => {
    dispatch(getReviews());
  }, []);

  const [input, setInput] = useState({
    rate: "",
    image: null,
    comment: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setInput({
        ...input,
        [name]: e.target.files[0],
      });
    } else {
      setInput({
        ...input,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { rate, image, comment } = input;
    rate === "" ? setInput({ ...input, rate: "5" }) : null;

    let imageUrl;
    if (image) {
      imageUrl = await uploadImageToCloudinary("reviews", image);
    }

    dispatch(
      postReview({
        rate,
        image: imageUrl ? imageUrl : null,
        comment,
        recipeId: id,
        userId: 6,
      })
    );

    setInput({
      rate: "",
      image: null,
      comment: "",
    });
    dispatch(getReviews());
  };

  return (
    <div className={s.container}>
      <div className={s.createReviewDiv}>
        <div className={s.titleDiv}>
          <h2>POST YOUR REVIEW!</h2>
        </div>
        <div className={s.inputsDiv}>
          <div className={s.starsAndUploadImageDiv}>
            <div className={s.starsInputDiv}>
              <span>⭐</span>
              <input
                type="range"
                max="5"
                min="1"
                name="rate"
                value={input.rate}
                onChange={handleOnChange}
              />
              <span>⭐⭐⭐⭐⭐</span>
            </div>
            <div className={s.uploadImageDiv}>
              <input type="file" name="image" onChange={handleOnChange} />
            </div>
          </div>
          <div className={s.commentDiv}>
            <textarea
              className={s.commentInput}
              placeholder="Write your comment"
              name="comment"
              value={input.comment}
              onChange={handleOnChange}
            />
            <button className={s.postButton} onClick={handleSubmit}>
              POST
            </button>
          </div>
        </div>
      </div>
      <div className={s.cardContainer}>
        {reviews &&
          reviews
            .filter((r) => r.recipeId === parseInt(id))
            .map(({ comment, image, rate, userId, createdAt }, i) => {
              return (
                <ReviewsCard
                  key={i}
                  comment={comment}
                  image={image}
                  rate={rate}
                  userId={userId}
                  createdAt={createdAt}
                />
              );
            })}
      </div>
    </div>
  );
};

export default ReviewsBox;
