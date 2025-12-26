import "./Experts.css";
import expertVideo from "../../../../assets/hero/converted-5.mp4";
import ExpertsCard from "./components/ExpertsCard";

const expertCards = [
  {
    id: 1,
    overline: "ONLINE TITLE",
    title: "HEALTHY FEEDING HABITS",
    duration: "02:15",
    video: expertVideo,
    accent: "255, 204, 102",
  },
  {
    id: 2,
    overline: "ONLINE TITLE",
    title: "HOW TO READ YOUR PET'S BODY LANGUAGE",
    duration: "03:05",
    video: expertVideo,
    accent: "129, 164, 255",
  },
  {
    id: 3,
    overline: "ONLINE TITLE",
    title: "VACCINE & HEALTH ROUTINE 101",
    duration: "02:45",
    video: expertVideo,
    accent: "255, 126, 106",
  },
  {
    id: 4,
    overline: "ONLINE TITLE",
    title: "KEEP THOSE NAILS SHORT & SAFE",
    duration: "01:40",
    video: expertVideo,
    accent: "116, 216, 188",
  },
];

const Experts = () => {
  return (
    <section className="experts">
      <div className="experts__header">
        <p className="experts__eyebrow">Short, smart pet care tips</p>
        <h2 className="experts__title">
         <span>Learn from the experts </span>
        </h2>
        {/* <p className="experts__lede">
          Quick video lessons covering the everyday questions pet parents ask, and each card is ready for a background clip.
        </p> */}
      </div>

      <div className="experts__grid">
        {expertCards.map((card) => (
          <ExpertsCard
            key={card.id}
            overline={card.overline}
            title={card.title}
            // duration={card.duration}
            video={card.video}
            accent={card.accent}
          />
        ))}
      </div>
    </section>
  );
};

export default Experts;
