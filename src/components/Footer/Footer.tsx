import React from "react";

import "./Footer.scss";

const Footer = () => {
  return (
    <div className="f-jcsb footer-wrapper">
      <div className="version">v1.0.1</div>
      <div className="credits">
        Icons made by{" "}
        <a
          href="https://www.flaticon.com/authors/pixel-perfect"
          title="Pixel perfect"
        >
          Pixel perfect
        </a>{" "}
        and{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.flaticon.com/authors/freepik"
          title="Freepik"
        >
          Freepik
        </a>{" "}
        from{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.flaticon.com/"
          title="Flaticon"
        >
          www.flaticon.com
        </a>
      </div>
    </div>
  );
};

export default Footer;
