// Author: Gillom McNeil (A00450414)

import { useHistory } from "react-router";
import { useState, useEffect } from "react";

const Timer = ({ minSecs, startGame, socket, categoryValues }) => {

  //===== STATES ============================================================
  const { minutes, seconds = 60 } = minSecs;
  const [[mins, secs], setTime] = useState([minutes, seconds]);
  const [isActive, setActive] = useState(false);
  const [hideButton, setHideButton] = useState(false);

  const history = useHistory();

  //===== EFFECTS ===========================================================
  useEffect(() => {
    if (isActive) {
      const timerId = setInterval(() => tick(), 1000);
      return () => clearInterval(timerId);
    }
  });

  //===== EVENT HANDLING ====================================================

  /**
   * @author Gillom McNeil (A00450414)
   *
   * Handles the "start_timer" event emitted by the server.
   *
   * Sets the clients clock to 2 min and turn on by setting isActive to true
   */
  socket.on("start_timer", () => {
    setTime([0,20]);
    setActive(true);
  });

  socket.on("hide_buttons", () => {
    setHideButton(true);
  });

  //===== EVENT EMISSION ====================================================

  /**
   * @author Gillom McNeil (A00450414)
   *
   * emit the start timers event to server, only the host can click this
   */
  const handleStartClick = () => {
    startGame();
    socket.emit("start_timers");
  }

  const reset = () => {
    setActive(false);
    setTime([0, 0]);
  }

  /**
   * @author Gillom McNeil (A00450414)
   *
   * Every second this function is called by the useEffect
   * decrement the clock by 1 second
   * emit the event sending all answers from the player to the server
   * send the user to the vote page
   */
  const tick = () => {
    if (mins === 0 && secs ===0) {
      //game ends
      //add current answers to the players list of words
      socket.emit("deliver_values", categoryValues);
      //go to voting page
      history.push('/vote');
      reset();
    } else if (secs === 0) {
      setTime([mins - 1, 59]);
    } else {
      setTime([mins, secs - 1]);
    }
  };

  //===== COMPONENT =========================================================
  return (
    <section className="Timer">
      <div>
        <p
          className="Time">{`${mins.toString().padStart(2, '0')}:
            ${secs.toString().padStart(2, '0')}`}
        </p>
      </div>
      {
          hideButton
          ? null
          : <button className="Btn" onClick={handleStartClick}>START</button>
      }
    </section>
  );
}

export default Timer;
