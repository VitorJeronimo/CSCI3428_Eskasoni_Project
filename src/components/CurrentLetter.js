import styles from "./CurrentLetter.module.css"

const CurrentLetter = ({currentLetter}) => {
  return (
    <section className={styles.CurrentLetter}>
      <h1>{ currentLetter }</h1>
    </section>
  );
}

export default CurrentLetter;