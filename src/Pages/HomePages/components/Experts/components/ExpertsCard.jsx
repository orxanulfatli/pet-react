import React from "react";
import "./ExpertsCard.css";
import { article } from "motion/react-client";

const ExpertsCard = ({ overline, title, duration, video, accent }) => {
  return (
    <article className="experts-card" style={{ "--card-accent": accent }}>
      {/* {video ? (
        <video
          className="experts-card__video"
          src={video}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <div className="experts-card__placeholder">Video placeholder</div>
      )} */}

      {/* <div className="experts-card__scrim" /> */}

      
      <div className="experts-card__content">
        <div className="experts-card__footer">
          <div className="experts-card__overline">{overline}</div>

          <h3 className="experts-card__title">{title}</h3>
          {duration && (
            <span className="experts-card__duration">{duration}</span>
          )}
        </div>
      </div>


    </article>
  );
};

export default ExpertsCard;
