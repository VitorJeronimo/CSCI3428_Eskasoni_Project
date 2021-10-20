import { useState, useEffect } from "react";
import styles from "./Timer.module.css";

const Timer = ({MinSecs}) => {

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
    <section className={ styles.Timer }>
      <div>
        <p className={ styles.time }>{`${mins.toString().padStart(2, '0')}:
          ${secs.toString().padStart(2, '0')}`}
        </p>
      </div>
      <button className={ styles.button } onClick={() => setActive(true)}>START</button>
    </section>
  );
}

export default Timer;