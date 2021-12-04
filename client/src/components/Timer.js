import { useHistory } from "react-router";
import { useState, useEffect } from "react";

const Timer = ({ minSecs, startGame, socket, categoryValues }) => {

  const { minutes, seconds = 60 } = minSecs;
  const [[mins, secs], setTime] = useState([minutes, seconds]);
  const [isActive, setActive] = useState(false);
  const [hideButton, setHideButton] = useState(false);

  const history = useHistory();

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

  const handleStartClick = () => {
    startGame();
    //setTime([2,30]);
    //setActive(true);
    socket.emit("start_timers");
  }

  socket.on("start_timer", () => {
    setTime([0,5]);
    setActive(true);
  });

  socket.on("hide_buttons", () => {
    setHideButton(true);
  });

  const reset = () => {
    setActive(false);
    setTime([0, 0]);
  }

  useEffect(() => {
    if (isActive) {
      const timerId = setInterval(() => tick(), 1000);
      return () => clearInterval(timerId);
    }
  });

  return (
    <section className="Timer">
      <div>
        <p 
          className="Time">{`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}
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
