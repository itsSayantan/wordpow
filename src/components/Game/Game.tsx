import React, { KeyboardEvent } from "react";

import { getRandomWord, calculateWPM } from "../../utils";

import PowIcon from "../../assets/images/pow.svg";

import "./Game.scss";

enum GAME_STATE {
  START,
  IN_GAME,
  PAUSED,
  GAME_OVER,
}

const disallowdKeys: Array<number> = [8];
const ignoredKeys: Array<number> = [16];

const Game = () => {
  const inputRef: React.RefObject<HTMLInputElement> = React.createRef();
  const w1Ref: React.RefObject<HTMLDivElement> = React.createRef();

  const [gameState, setGameState] = React.useState(GAME_STATE.START);
  const [typingEnabled, setTypingEnabled] = React.useState(false);
  const [inputText, setInputText] = React.useState("");
  const [words, setWords] = React.useState([getRandomWord(), getRandomWord()]);
  const [score, setScore] = React.useState(0);
  const [time, setTime] = React.useState(0);
  const [startTime, setStartTime] = React.useState(-1);
  const [endTime, setEndTime] = React.useState(-1);

  const startGame = (): void => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setTypingEnabled(true);
    setGameState(GAME_STATE.IN_GAME);
    setStartTime(Date.now());
  };

  const restartGame = (): void => {
    setGameState(GAME_STATE.START);
    setTypingEnabled(false);
    setInputText("");
    setWords([getRandomWord(), getRandomWord()]);
    setScore(0);
    setTime(0);
    setStartTime(-1);
    setEndTime(-1);
  };

  const pauseGame = React.useCallback((): void => {
    if (gameState === GAME_STATE.GAME_OVER) {
      return;
    }
    setGameState(GAME_STATE.PAUSED);
    setTime(time + (Date.now() - startTime));
    setStartTime(-1);
    setTypingEnabled(false);
  }, [time, gameState, startTime]);

  const resumeGame = (): void => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setGameState(GAME_STATE.IN_GAME);
    setStartTime(Date.now());
    setTypingEnabled(true);
  };

  const resetInput = (): void => {
    setInputText("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const showErrorText = (): void => {
    if (w1Ref.current) {
      w1Ref.current.classList.add("error-text");
      setTimeout(() => {
        w1Ref.current?.classList.remove("error-text");
      }, 700);
    }
  };

  const updateCurrentWord = (val: string): void => {
    if (val.length === words[0].length) {
      // the word is successfully typed
      const newWord = getRandomWord();
      setWords([words[1], newWord]);
      resetInput();
      setScore(score + 1);
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
          resetInput();
          // set the end time before doing anything else
          setEndTime(Date.now());
          // show the error text for 700 milliseconds and then change the game state to GAME_OVER
          showErrorText();
          setTimeout(() => {
            setGameState(GAME_STATE.GAME_OVER);
            setTypingEnabled(false);
          }, 700);
        }
      }
    }
  };

  React.useEffect(() => {
    const inp = inputRef.current;
    if (inp) {
      inp.addEventListener("blur", pauseGame);
    }
    return () => {
      inp?.removeEventListener("blur", pauseGame);
    };
  }, [inputRef, pauseGame]);

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
            <div className="w-2">{words[1]}</div>
          </div>
        );
      }
      case GAME_STATE.PAUSED: {
        return (
          <div className="f-jcc fw game-paused-container">
            <h3>PAUSED</h3>
            <p>Don't worry. Your progress is not lost.</p>
            <div className="resume-button" onClick={resumeGame}>
              RESUME
            </div>
          </div>
        );
      }
      case GAME_STATE.GAME_OVER: {
        return (
          <div className="f-jcc fw game-over-container">
            <h3>GAME OVER</h3>
            <p>
              Your Score: <b>{score}</b>
            </p>
            <p>
              Words per minute:{" "}
              <b>{calculateWPM(score, time, startTime, endTime)}</b>
            </p>
            <div className="restart-button" onClick={restartGame}>
              RESTART
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
      <input ref={inputRef} type="text" onKeyUp={handleInputChange} />
      {getContainer(gameState)}
    </div>
  );
};

export default Game;
