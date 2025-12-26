import "./QrCode.css";
import qrImg from "../../../../../../src/assets/icons/hero/qr.png";


const QrCode = () => {
  return (
    <div className="qr-code-container">
      <div className="qr-code-img-container">
        <img src={qrImg} alt="" />
      </div>
      <p className="qr-code-text">
        Scan to Download
        <br /> Now Dosty App
      </p>
    </div>
  );
};

export default QrCode;