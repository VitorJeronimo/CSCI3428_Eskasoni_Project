// import styles from "./CurrentLetter.module.css"

const CurrentLetter = ({currentLetter}) => {
  return (
    <section className="InitialLetter">
      <h1>{ currentLetter }</h1>
    </section>
  );
}

export default CurrentLetter;