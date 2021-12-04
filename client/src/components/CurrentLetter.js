// import styles from "./CurrentLetter.module.css"

const CurrentLetter = ({currentLetter}) => {
  return (
    <section className="InitialLetter">
      <button className="Btn LetterSound">🔊</button>
      <div className="LetterContainer">
          <h1>{ currentLetter.character }</h1>
      </div>
    </section>
  );
}

export default CurrentLetter;
