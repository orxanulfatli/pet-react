import "./QrCode.css";
import qrImg from "../../../../../src/assets/icons/hero/qr.png";

const QrCode = ({ variant = "yellow", showTextClass = false }) => {
  const bgClass =
    variant === "green" ? "qr-green-background" : "qr-yellow-background";
  const textClass = showTextClass ? "qr-code-text" : "";

  return (
    <div className={`qr-code-container ${bgClass}`}>
      <div className="qr-code-img-container">
        <img src={qrImg} alt="" />
      </div>
      <p className={textClass}>
        Scan to Download
        <br /> Now Dosty App
      </p>
    </div>
  );
};

export default QrCode;
