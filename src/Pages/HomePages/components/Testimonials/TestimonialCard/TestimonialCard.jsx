import "./TestimonialCard.css";

const TestimonialCard = ({ avatar, name, role, text, accentColor }) => {
  const pawIndices = [23, 27, 31, 41, 45, 55,59,64,67,70,73,77,80,87,92];
  const cardIcons = Array.from({ length: 96 }, (_, index) => {
    const isPaw = pawIndices.includes(index);
    return (
      <span
        key={index}
        className={`testimonial-card__icon${isPaw ? " is-paw" : ""}`}
        aria-hidden="true"
      >
        {isPaw ? "" : "“"}
      </span>
    );
  });
  return (
    <div className="testimonial-card ">
      <div className="testimonial-card__top">
        <div className="testimonial-card__avatar">
          <img src={avatar} alt=""  />
        </div>

        <div className="testimonial-card__pattern">{cardIcons}</div>
        <div className="testimonial-card__meta">
          <div className="testimonial-card__name">{name}</div>
          <div className="testimonial-card__role">{role}</div>
        </div>
      </div>

      <div className="testimonial-card__text">{text}</div>
    </div>
  );
};

export default TestimonialCard;
