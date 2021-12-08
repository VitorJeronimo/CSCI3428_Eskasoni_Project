import Word from "./Word";

const WordList = ({answers, socket}) => {
    return (
        <div className="WordList">
            {answers.map((word) => (
            <Word key={word.id} word={word.answer} player={word.userName} score={word.score} socket={socket}/>))}
        </div>
    );
}

export default WordList;