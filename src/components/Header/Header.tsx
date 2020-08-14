import React from "react";

import GithubLogo from "../../assets/images/github.svg";

import "./Header.scss";

const Header = () => {
  return (
    <div className="header f-jcsb">
      <div className="brand">W O R D P O W</div>
      <div className="links f-jcc">
        <a href="https://github.com/itsSayantan/wordpow">
          <img src={GithubLogo} alt="Github Link" />
        </a>
      </div>
    </div>
  );
};

export default Header;
