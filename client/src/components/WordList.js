import Word from "./Word";

const WordList = ({answers, sendVote}) => {
    return (
        <div className="WordList">
            {answers.map((word) => (
            <Word key={word.id} word={word.answer} player={word.userName} score={word.score} sendVote={sendVote}/>))}
        </div>
    );
}

export default WordList;