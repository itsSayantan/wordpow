import React from "react";

import PowIcon from "../../assets/images/pow.svg";

import "./Game.scss";

enum GAME_STATE {
  START,
  COUNTDOWN,
  IN_GAME,
}

const Game = () => {
  const [gameState, setStarted] = React.useState(GAME_STATE.START);

  const getContainer = (gameState: any): JSX.Element => {
    switch (gameState) {
      case GAME_STATE.START: {
        return (
          <div className="f-jcc fw game-start-container">
            <img className="pow-icon" src={PowIcon} alt="Pow Icon" />
            <div className="instructions">
              Try to type all the words accurately as they come randomly on the
              screen.<div>Mistype and you are out.</div>
            </div>
            <div
              className="start-button"
              onClick={() => setStarted(GAME_STATE.COUNTDOWN)}
            >
              START
            </div>
          </div>
        );
      }
      case GAME_STATE.COUNTDOWN: {
        return <></>;
      }
      case GAME_STATE.IN_GAME: {
        return (
          <div className="game-main-container">
            <div className="w-1">Computer</div>
            <div className="w-2">Smart</div>
          </div>
        );
      }
      default:
        return (
          <div className="app-unexpected-error">
            Something went terribly wrong. Try refreshing the page. If that
            doesn't work, please raise an issue with the steps to reproduce in
            the project{" "}
            <a href="https://github.com/itsSayantan/wordpow">Github Page</a>
          </div>
        );
    }
  };

  return <div className="f-jcc g-wrapper">{getContainer(gameState)}</div>;
};

export default Game;
