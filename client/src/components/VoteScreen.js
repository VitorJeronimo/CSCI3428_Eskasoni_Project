const VoteScreen = ({currentCategory}) => {
    return (
        <div className="App">
            <h2>{currentCategory}</h2>
            <WordList currentCategory={currentCategory}/>
        </div>
    );
}
 
export default VoteScreen;