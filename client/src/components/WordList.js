import Word from "./Word";

const WordList = ({answers}) => {
    return (
        <div className="WordList">
            {answers.map((word) => (
            <Word word={word.answer} player={word.userName}/>))}
        </div>
    );
}

export default WordList;