const Word = ({word, player}) => {

    const voteYes = () => {

    };

    const voteNo = () => {

    };

    return (
        <div className="Word">
            <div className="ContentLeft">
                <label className="voteScore">+0</label>
                <label className="WordLabel">{word}</label>
            </div>
            <div className="ContentRight">
                <label className="PlayerLabel">{player}</label>
                <button className="BtnVote VoteYes" onClick={voteYes}>Yes</button>
                <button className="BtnVote VoteNo" onClick={voteNo}>No</button>
            </div>
        </div>
    );
}

export default Word;