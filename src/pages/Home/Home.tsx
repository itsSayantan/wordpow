import React from "react";

import Header from "../../components/Header/Header";
import Game from "../../components/Game/Game";
import Footer from "../../components/Footer/Footer";

import "./Home.scss";

const Home = () => {
  return (
    <div className="home-wrapper">
      <Header />
      <Game />
      <Footer />
    </div>
  );
};

export default Home;
