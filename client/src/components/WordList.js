import Word from "./Word";

const WordList = ({words}) => {
    return (
        <section className="WordList">
            <div className="WordContainer">
                {words.map((word) => (
                <Word key={word.id} word={word}/>))}
            </div>
        </section>
    );
}
 
export default WordList;