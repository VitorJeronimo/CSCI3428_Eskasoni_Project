import {useState} from "react";

const Word = ({word, player, score, socket}) => {
    const [disable, setDisable] = useState(false);

    const vote = (scoreDifference, player) => {
        socket.emit("updateVoteScore", answers, player, scoreDifference);
        setDisable(true);
    };

    return (
        <div className="Word">
            <div className="ContentLeft">
                <label className="voteScore">{score}</label>
                <label className="WordLabel">{word}</label>
            </div>
            <div className="ContentRight">
                <label className="PlayerLabel">{player}</label>
                <button disabled={disable} className="BtnVote VoteYes" onClick={vote(1, player)}>Yes</button>
                <button disabled={disable} className="BtnVote VoteNo" onClick={vote(-1, player)}>No</button>
            </div>
        </div>
    );
}

export default Word;