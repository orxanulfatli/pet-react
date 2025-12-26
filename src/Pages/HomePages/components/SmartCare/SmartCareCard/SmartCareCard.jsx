import React, { useRef } from "react";
import cardAvatar from "../../../../../../src/assets/icons/avatar.png";
import "./SmartCareCard.css";

const SmartCareCard = ({
  id,
  badge,
  title,
  subtitle,
  text,
  background,
  staticFill = 0,
}) => {
  const ref = useRef(null);

  const segmentFills = (() => {
    const fills = [0, 0, 0];
    let remaining = staticFill * 3; // 3 segmentlik pay
    for (let i = 0; i < 3; i += 1) {
      fills[i] = Math.min(Math.max(remaining, 0), 1);
      remaining = Math.max(remaining - 1, 0);
    }
    return fills;
  })();

  return (
    <article
      ref={ref}
      className="care-card"
      style={{
        background,
      }}
    >
      {/* top bar */}
      <div className="card-status-shell">
        <div className="card-status-bar">
          <div className="card-status-segments">
            {segmentFills.map((fill, idx) => (
              <span key={idx}>
                <i style={{ width: `${fill * 100}%` }} />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* header */}
      <header className="card-header">
        <div className="card-avatar">
          <img src={cardAvatar} alt="" />
        </div>
        <div className="card-header-text">
          <div className="card-name">
            Dosty <span>2h</span>
          </div>
          <div className="card-sub">Your friend</div>
        </div>
        <div className="card-menu">•••</div>
      </header>

      {/* main content */}
      <div className="card-body">
        <div className="1">
          {" "}
          <div className="card-badge">{badge}</div>
          <h3 className="card-title">{title}</h3>
        </div>
        <div className="2">
          <div className="card-subtitle">{subtitle}</div>
          <p className="card-text">{text}</p>
        </div>
      </div>
    </article>
  );
};

export default SmartCareCard;

