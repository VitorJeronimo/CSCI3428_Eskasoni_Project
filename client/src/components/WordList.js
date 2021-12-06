import Word from "./Word";

const WordList = ({answers, vote}) => {
    return (
        <div className="WordList">
            {answers.map((word) => (
            <Word word={word.answer} player={word.userName} score={word.score} vote={vote}/>))}
        </div>
    );
}

export default WordList;
