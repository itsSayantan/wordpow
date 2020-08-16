import React, { KeyboardEvent } from "react";

import PowIcon from "../../assets/images/pow.svg";

import "./Game.scss";

enum GAME_STATE {
  START,
  IN_GAME,
}

const disallowdKeys: Array<number> = [8];
const ignoredKeys: Array<number> = [16];

const Game = () => {
  const inputRef: React.RefObject<HTMLInputElement> = React.createRef();
  const w1Ref: React.RefObject<HTMLDivElement> = React.createRef();
  const w2Ref: React.RefObject<HTMLDivElement> = React.createRef();

  const [gameState, setStarted] = React.useState(GAME_STATE.START);
  const [typingEnabled, setTypingEnabled] = React.useState(false);
  const [inputText, setInputText] = React.useState("");
  const [words, setWords] = React.useState(["Computer", "Smart"]);

  const startGame = (): void => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setTypingEnabled(true);
    setStarted(GAME_STATE.IN_GAME);
  };

  const resetInput = (): void => {
    setInputText("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const updateCurrentWord = (val: string): void => {
    if (val.length === words[0].length) {
      // the word is successfully typed
      setWords([words[1], "LOL"]);
      resetInput();
    }
  };

  const handleInputChange = (e: KeyboardEvent<HTMLInputElement>): void => {
    e.preventDefault();

    if (typingEnabled) {
      const which = e.which;

      if (!disallowdKeys.includes(which) && !ignoredKeys.includes(which)) {
        const val = e.key;

        if (words[0].startsWith(inputText + val)) {
          setInputText(inputText + val);
          updateCurrentWord(inputText + val);
        } else {
          // error case
          setTypingEnabled(false);
          resetInput();
          alert("game over");
        }
      }
    }
  };

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
            <div className="start-button" onClick={startGame}>
              START
            </div>
          </div>
        );
      }
      case GAME_STATE.IN_GAME: {
        return (
          <div className="game-main-container">
            <div ref={w1Ref} className="w-1">
              {inputText.length > 0 ? (
                <>
                  <span>{inputText}</span>
                  {words[0].substr(inputText.length)}
                </>
              ) : (
                <>
                  <span></span>
                  {words[0]}
                </>
              )}
            </div>
            <div ref={w2Ref} className="w-2">
              {words[1]}
            </div>
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

  return (
    <div className="f-jcc g-wrapper">
      <input ref={inputRef} type="text" onKeyPress={handleInputChange} />
      {getContainer(gameState)}
    </div>
  );
};

export default Game;
