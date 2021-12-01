import Word from "./Word";

const WordList = () => {
    const answers = ["guess#1", "guess2", "g3", "long_guess_answer#12343455", 'g5', 'g6']
    return (
        <section className="WordList">
            <div className="WordContainer">
                {answers.map((word) => (
                <Word word={word}/>))}
            </div>
        </section>
    );
}

export default WordList;