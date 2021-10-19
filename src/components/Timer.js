import React from "react";
import styles from "./Timer.module.css";

const Timer = ({MinSecs}) => {

  const { minutes, seconds = 60 } = MinSecs;
  const [[mins, secs], setTime] = React.useState([minutes, seconds]);

  const tick = () => {
    if (mins === 0 && secs ===0)
      reset()
    else if (secs === 0) {
      setTime([mins - 1, 59]);
    } else {
      setTime([mins, secs - 1]);
    }
  };

  const reset = () => setTime([parseInt(minutes), parseInt(seconds)]);

  React.useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  return (
    <section className={styles.Timer}>
      <div>
        <p className={styles.time}>{`${mins.toString().padStart(2, '0')}:
          ${secs.toString().padStart(2, '0')}`}
        </p>
      </div>
      <button className={styles.button}>START</button>
    </section>
  );
}

export default Timer;