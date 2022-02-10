// Author: Gillom McNeil (A00450414)
// Author: Vitor Jeronimo (A00431599)

const Word = ({word, player, score, vote}) => {

    return (
        <div className="Word">
            <div className="ContentLeft">
                <label className="voteScore">{score}</label>
                <label className="WordLabel">{word}</label>
            </div>
            <div className="ContentRight">
                <label className="PlayerLabel">{player}</label>
                <button className="BtnVote VoteYes" onClick={vote(1, player)}>Yes</button>
                <button className="BtnVote VoteNo" onClick={vote(-1, player)}>No</button>
            </div>
        </div>
    );
}

export default Word;
