import "./AiAssistant.css";

import aiLeft from "../../../../../src/assets/icons/aiassistant/ai-1.png";
import aiRight from "../../../../../src/assets/icons/aiassistant/ai-2.png";

const incomeMessages=[{text:"Hello Friend!👋",type:"incoming"},{text:"How can I help you today?",type:"incoming"},{text:"···",type:"typing"}];

const AiAssistant = () => {
  return (
    <section className="ai-assistant">
      {/* Ai assistant  Container */}
      <div className="ai-assistant__container">
        {/* Header */}
        <header className="ai-assistant__header">
          {/* Badge */}

          <p className="ai-assistant__badge">AI ASSISTANT</p>

          {/* Title & Subtitle */}
          <div className="ai-assistant__title-wrap">
            {/* Title */}
            <h2 className="ai-assistant__title">
              <span className="ai-assistant__title-line">
                LET&apos;S <span className="title-gradient">Tal</span>k OUR
              </span>

              <div className="ai-assistant__headline">
                <div className="ai-assistant__image ai-assistant__image--left">
                  <img src={aiLeft} alt="Dog with phone" />
                </div>
                <span className="ai-assistant__title-line accent">
                  DOSTY AI
                </span>

                <div className="ai-assistant__image ai-assistant__image--right">
                  <img src={aiRight} alt="Dalmatian with phone" />
                </div>
              </div>
            </h2>

            {/* Subtitle */}
            <p className="ai-assistant__subtitle">
              Ask anything — from symptoms and behavior to training and
              nutrition. Dosty&apos;s AI Assistant gives fast, reliable,
              pet-specific answers whenever you need help.
            </p>
          </div>
        </header>

        {/* Chat */}
        <div className="ai-assistant-chat">
          <div className="ai-assistant-chat__messages">
            <div className="ai-assistant-chat__column">
              <div className="bubble bubble--incoming">Hello Friend!👋</div>
              <div className="bubble bubble--incoming bubble--stack">
                How can I help you today?
              </div>
              <div className="bubble bubble--typing">···</div>
            </div>

            <div className="ai-assistant-chat__column ai-assistant-chat__column--right">
              <div className="bubble bubble--outgoing">I have Golden🐾</div>
            </div>
            <div className="bubble bubble--typing">···</div>
          </div>
          <div className="ai-assistant-chat__input">
            <input
              type="text"
              placeholder="Ask anything about your pet..."
              readOnly
            />
            <div className="ai-assistant__input-actions">
              <button
                className="icon-btn icon-btn--ghost"
                aria-label="Add"
              ></button>
              <div className="pill">
                <span className="pill__avatar" aria-hidden="true"></span>
                <span className="pill__label">Dosty AI</span>
              </div>
              <button
                className="icon-btn icon-btn--dark"
                aria-label="Send"
              ></button>
            </div>
          </div>{" "}
        </div>
      </div>
    </section>
  );
};

export default AiAssistant;
