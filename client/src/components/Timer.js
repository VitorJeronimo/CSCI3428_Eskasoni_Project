import { buildQueries } from "@testing-library/dom";
import { useState, useEffect } from "react";
import { Socket } from "socket.io";

const Timer = ({ MinSecs, startGame, socket, start }) => {

  const { minutes, seconds = 60 } = MinSecs;
  const [[mins, secs], setTime] = useState([minutes, seconds]);
  const [isActive, setActive] = useState(false);

  const tick = () => {
    if (mins === 0 && secs ===0)
      reset()
    else if (secs === 0) {
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
    setTime([2,30]);
    setActive(true);
  });

  socket.on("hide_buttons", () => {
    document.getElementsByClassName("timerButtons")[0].style.display = "none";
  });

  const handleResetClick = () => {
    setTime([0,0]);
    setActive(false);
  }

  const reset = () => {
    setActive(false);
    setTime([parseInt(minutes), parseInt(seconds)]);
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
        <p className="time">{`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}
        </p>
      </div>
      <div className="timerButtons">
        <button className="button" onClick={handleStartClick}>START</button>
        <button className="button" onClick={start}>RESET</button>
      </div>
    </section>
  );
}

export default Timer;
