import "./Stats.css";
import useRevealOnView from "./../../../../shared/hooks/useRevealOnView";

export default function Stats() {
  const stats = [
    {
      id: "#001",
      title: "From vaccines",
      number: 3000,
      desc: "Expert-written articles and tips",
    },
    {
      id: "#002",
      title: "And nutrition",
      number: 400,
      desc: "Dog and cat breeds supported",
    },
    {
      id: "#003",
      title: "And nutrition",
      number: 65,
      desc: "Pet symptoms assessed",
    },
    {
      id: "#004",
      title: "And nutrition",
      number: 10,
      desc: "Veterinarians on our expert team",
    },
  ];

  const { visible, getRef } = useRevealOnView(stats.length, {
    threshold: 1,
  });

  return (
    <section className="stats">
      <div className="stats-container">
        {stats.map((item, index) => (
          <div className="stat-row" key={index}>
            {/* Left text */}
            <div className="stat-left">
              <span className="stat-id">{item.id}</span>
              <span className="stat-title">{item.title}</span>
            </div>

            {/* Big number */}
            <div className="stat-number">
              <div
                className="number"
                data-index={index}
                ref={getRef(index)}
                style={{ display: "inline-flex" }}
              >
                {String(item.number)
                  .split("")
                  .map((digit, digitIndex) => (
                    <span
                      className={`digit ${visible[index] ? "is-visible" : ""}`}
                      key={`${item.id}-digit-${digitIndex}`}
                      style={{
                        "--digit-delay": `${digitIndex * 120}ms`,
                      }}
                    >
                      <span className="digit-ghost">{digit}</span>
                      <span className="digit-live">{digit}</span>
                    </span>
                  ))}
                <span
                  className={`number-suffix ${
                    visible[index] ? "is-visible" : ""
                  }`}
                  style={{
                    "--suffix-delay": `${String(item.number).length * 120}ms`,
                  }}
                >
                  +
                </span>
              </div>

              {/* Bottom description */}
              <div className="stat-desc">{item.desc}</div>
            </div>

            {/* Right text */}
            <div className="stat-right">
              Because learning about pets <br /> should be fun!
            </div>
          </div>
        ))}
      </div>
      <div
        className="hello"
        style={{ color: "black", backgroundColor: "red" }}
      ></div>
    </section>
  );
}
