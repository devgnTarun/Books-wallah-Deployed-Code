import React from "react";
import ReactStars from "react-rating-stars-component";
import userPic from "../../Images/user.png";
import {Rating} from '@material-ui/lab'


const CardReview = ({ review }) => {
  const options = {
    size: "large",
    color : "orange",
    value: review.rating,
    readOnly: true,
    precision : 0.5
  };

  return (
    <>
      <div className="review">
        <div className="review-top">
          <div className="profile-pic">
            <img src={userPic} alt="" />
          </div>
          <div className="name-user">
            <h2>{review.name}</h2>
            <span>{review.createdAt}</span>
          </div>
          <div className="review-i">
            <Rating {...options} />
          </div>
        </div>
        <div className="review-comment">
          <p>{review.comment}</p>
        </div>
      </div>
    </>
  );
};

export default CardReview;
