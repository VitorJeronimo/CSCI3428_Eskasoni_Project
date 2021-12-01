const Word = ({word}) => {
    return (
        <div className="Word">
            <label className="WordLabel">{word}</label>
            <label className="PlayerLabel">username</label>
            <button className="voteYes">Yes</button>
            <button className="voteNo">No</button>
        </div>
    );
}

export default Word;