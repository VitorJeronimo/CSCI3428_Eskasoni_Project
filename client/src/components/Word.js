const Word = ({word, player}) => {
    return (
        <div className="Word">
            <div className="ContentLeft">
                <label className="WordLabel">{word}</label>
            </div>
            <div className="ContentRight">
                <label className="PlayerLabel">{player}</label>
                <button className="BtnVote VoteYes">Yes</button>
                <button className="BtnVote VoteNo">No</button>
            </div>
        </div>
    );
}

export default Word;