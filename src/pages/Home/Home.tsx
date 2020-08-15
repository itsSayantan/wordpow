import React from "react";

import Header from "../../components/Header/Header";
import Game from "../../components/Game/Game";

import "./Home.scss";

const Home = () => {
  return (
    <div className="home-wrapper">
      <Header />
      <Game />
    </div>
  );
};

export default Home;
