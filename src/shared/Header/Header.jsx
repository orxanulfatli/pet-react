import "./Header.css";
import ContentContainer from "../ContentContainer/ContentContainer";
import headerLogo from "../../../src/assets/icons/header-logo.svg";
import headerBg from "../../../src/assets/icons/D.png";
import { useState } from "react";




const Header = () => {
      const [mode, setMode] = useState("b2c");
  return (
    <header className="header">
      <ContentContainer className={"header-container"}>
        {/* <div className="header-logo-container">
          <div className="header-logo-bg">
            {" "}
            <img src={headerLogo} className="header-logo-img" alt="Logo" />
          </div>
        </div> */}
        {/* <div className="header-logo-container">
          <div className="header-logo-bg">
            {" "}
            <img src={headerBg} className="header-logo-bg" alt="Logo" />
            <img src={headerLogo} className="header-logo-img" alt="Logo" />
          </div>
        </div> */}
        <div className="header-logo-container">
          <img
            src={headerLogo}
            alt="Geeksforgeeks.org"
            className="header-logo-img"
          />
        </div>
        <div className="header-menu-wrapper">
          {/* <div className="header-menu-bg"></div> */}

          <nav className="header-menu">
            <a>Menu 1</a>
            <a>Dog</a>
            <a>Calculator</a>
          </nav>
        </div>
        <div className="b2-toggle">
          <button
            className={`toggle-item ${mode === "b2c" ? "active" : ""}`}
            onClick={() => setMode("b2c")}
          >
            B2C
          </button>

          <button
            className={`toggle-item ${mode === "b2b" ? "active" : ""}`}
            onClick={() => setMode("b2b")}
          >
            B2B
          </button>
        </div>
      </ContentContainer>
    </header>
  );
};

export default Header;
