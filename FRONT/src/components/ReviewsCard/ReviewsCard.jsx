import React from "react";
import s from "./ReviewsCard.module.scss";

const ReviewsCard = (props) => {
  const png = "https://cdn-icons-png.flaticon.com/512/2253/2253461.png";

  const { comment, image, rate, userId, createdAt } = props;

  const rateToStars = (rate) => {
    switch (rate) {
      case 1:
        return "⭐";
      case 2:
        return "⭐⭐";
      case 3:
        return "⭐⭐⭐";
      case 4:
        return "⭐⭐⭐⭐";
      case 5:
        return "⭐⭐⭐⭐⭐";
      default:
        break;
    }
  };

  const trimDate = (date) => {
    let hour = date.split("T")[1];
    date = date.split("T")[0];
    date = date.split("-");
    date = `${date[2]}/${date[1]}/${date[0]}`;
    hour = hour.split(":");
    hour = `${hour[0]}:${hour[1]}`;
    return `${date} - ${hour}`;
  };

  return (
    <div className={s.container}>
      <div className={s.imgDiv}>
        <img src={image ? image : png} alt={userId} />
      </div>
      <div className={s.infoDiv}>
        <span className={s.stars}>{rateToStars(rate)}</span>
        <span className={comment.length > 30 ? s.longComment : null}>
          {comment}
        </span>
        <div className={s.userDiv}>
          <span>{userId}</span>
          <span>{trimDate(createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewsCard;
