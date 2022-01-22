// Author: Vitor Jeronimo (A00431599)

const CurrentLetter = ({ currentLetter, gameStarted, playSound }) => {

  return (
    <section className="InitialLetter">
    {
        gameStarted 
        ? <button className="Btn LetterSound" onClick={playSound}>🔊</button> 
        : null
    }
      <div className="LetterContainer">
          <h1>{ currentLetter.character }</h1>
      </div>
    </section>
  );
}

export default CurrentLetter;
