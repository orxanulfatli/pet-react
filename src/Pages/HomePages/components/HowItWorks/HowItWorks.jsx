import { useMemo, useState } from "react";
import "./HowItWorks.css";
import puppyBg from "../../../../../src/assets/icons/howitworks/puppy.png";
import adultBg from "../../../../../src/assets/icons/howitworks/adult.png";
import seniorBg from "../../../../../src/assets/icons/howitworks/senior.png";

const STAGES = [
  {
    key: "puppy",
    label: "Puppy",
    title:(<> Building strong, <br/> healthy beginnings</>),
    problem:
      "Newborns need the right start. Dost helps you track colostrum intake, early crawling milestones, and introduces gentle handling cues to boost confidence.",
    solution:
      "“I’m not sure how often to feed my newborn pup.” → Dost sets reminders and feeding schedules customized for age and breed.",
  },
  {
    key: "adult",
    label: "Adult",
    title: (<>Keep your pet active,<br/> happy, and balanced</>),
    problem:
      "Manage diet, track activity, and prevent early health issues. Dost syncs nutrition data and sends smart reminders — from walks to hydration checks.",
    solution:
      "My cat gained weight after neutering.” → Dost adjusts daily calorie targets and suggests play routines to stay fit.",
  },
  {
    key: "senior",
    label: "Senior",
    title: (<>Support and <br/> comfort, every day</>),
    problem:
      "Older pets need extra attention. Dost monitors changes in mobility, behavior, and appetite — providing timely advice and vet check alerts.",
    solution:
      "My senior dog struggles with stairs.” → Dost suggests simple joint exercises and early vet screening reminders.  ",
  },
];

const bgUrlFor = (key) => {
  if (key === "puppy") return puppyBg;
  if (key === "adult") return adultBg;
  if (key === "senior") return seniorBg;
  return puppyBg;
};

const HowItWorks = () => {
  const [activeKey, setActiveKey] = useState(STAGES[0].key);
  const [isLoading, setIsLoading] = useState(false);

  const activeStage = useMemo(
    () => STAGES.find((stage) => stage.key === activeKey) ?? STAGES[0],
    [activeKey]
  );


  /* --- Handle Stage Change with cashing image (img.src) --*/
  const handleStage = (next) => {
    if (next === activeKey || isLoading) return;
    setIsLoading(true);
    const img = new Image();
    img.src = bgUrlFor(next);
    img.onload = () => {
      setActiveKey(next);
      setIsLoading(false);
    };
  };

  return (
    <section className={`how-it-works how-it-works--${activeStage.key}`}>
      <div className="how-it-works__content">
      {  /* ---Header --*/}
        <div className="how-it-works__header">
          <h2 className="how-it-works__title">HOW IT WORKS?</h2>
        <p className="how-it-works__subtitle">
          From playful puppies to wise seniors — Dosty adapts to every stage of your pet’s life, <br/>
          offering guidance, reminders, and personalized care tips.
        </p></div>
       
        {/* --- Card --*/}
        <div className="how-it-works__card" key={activeStage.key}>
          {/* --- Top Side --*/}
          <div className="how-it-works__card-left">
            <p className="how-it-works__card-title">{activeStage.title}</p>
          </div>
          
          {/* --- Bottom Side --*/}
          <div className="how-it-works__card-right">
            <div className="how-it-works__block">
              <p className="how-it-works__block-label">PROBLEM</p>
              <p className="how-it-works__block-text">{activeStage.problem}</p>
            </div>
            <div className="how-it-works__block">
              <p className="how-it-works__block-label">SOLUTION</p>
              <p className="how-it-works__block-text">{activeStage.solution}</p>
            </div>
          </div>


        </div>
      
        {/* --- Tabs --*/}
        <div className="how-it-works__tabs">
          {STAGES.map((stage) => (
            <button
              key={stage.key}
              type="button"
              className={`how-it-works__tab ${
                activeKey === stage.key ? "is-active" : ""
              }`}
              onClick={() => handleStage(stage.key)}
              aria-pressed={activeKey === stage.key}
            >
              {stage.label}
            </button>
          ))}
        </div>


      </div>
    </section>
  );
};

export default HowItWorks;
