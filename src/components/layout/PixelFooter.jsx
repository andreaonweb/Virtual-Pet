import React from "react";
const PixelFooter = () => {
  return (
    <footer
      className="d-flex flex-column align-items-center justify-content-center py-3"
      style={{
        backgroundColor: "#fbeedb", 
        borderTop: "4px solid #a78bfa",
        boxShadow: "0 -2px 0 #bda8f7 inset",
        fontFamily: "'Pixelify Sans', monospace",
        color: "#7b5ba5",
        textAlign: "center",
      }}
    >
      <style>
        {`
          .pixel-footer-text {
            font-size: 1.2rem;
            letter-spacing: 1px;
          }

          .pixel-footer-links {
            font-size: 0.9rem;
            color: #8b6bbf;
            margin-top: 4px;
          }

          .pixel-footer-links a {
            color: #8b6bbf;
            text-decoration: none;
            margin: 0 8px;
            transition: all 0.2s ease;
          }

          .pixel-footer-links a:hover {
            color: #a277ff;
            text-decoration: underline;
          }
        `}
      </style>

      <div className="pixel-footer-text">
        🌸 Virtual Pet Game © {new Date().getFullYear()}
      </div>

      <div className="pixel-footer-links">
        <a href="#">About</a>|
        <a href="#">Credits</a>|
        <a href="#">Support</a>
      </div>
    </footer>
  );
};

export default PixelFooter;
