import WordList from "./WordList";

const VoteScreen = ({socket}) => {
    return (
        <div className="VoteScreen">
            <h2>Current Category</h2>
            <WordList />
        </div>
    );
}

export default VoteScreen;