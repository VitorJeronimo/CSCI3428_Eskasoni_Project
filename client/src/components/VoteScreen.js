import WordList from "./WordList";
import { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const VoteScreen = ({socket}) => {
    const [currentCategory, setCurrentCategory] = useState("");
    const [answers, setCurrentAnswers] = useState([]);
    const [categoryNumber, setCategoryNumber] = useState(0);
    const location = useLocation();

    //this will only run on the first render, getting the ball rolling
    //subsequent calls will be done by the 'next' button
    useEffect(() => {
        socket.emit('request_category/answers', categoryNumber);
    }, []);

    //this will handle distributing the new category/ answers into the components
    socket.on("receive_category/answers", (answers) => {
        //set the new currentCategory
        console.log(answers[0].category);
        console.log(answers.slice(1));
        setCurrentCategory(answers[0].category);
        //setCurrentAnswers(answers.slice(1));
    });

    //this will handle recieving an updated list of scores whenever someone votes
    socket.on("receive_updated_scores", (answers) => {
        console.log(answers.slice(1));
        setCurrentAnswers(answers.slice(1));
    });

    const handleNextCategory = () => {
        setCategoryNumber(categoryNumber + 1);
        socket.emit('request_category/answers', categoryNumber);
    };

    const sendVote = (answers, player, scoreDifference) => {
        // socket.emit("updateVoteScore", answers, player, scoreDifference);
    };

    return (
        <div className="VoteScreen">
            <div className="VoteCardTitle">
                <h2>{currentCategory}</h2>
                <button className="nextCategorybtn" onClick={handleNextCategory}>Next</button>
            </div>
            <WordList answers={answers} sendVote={sendVote}/>
        </div>
    );
}

export default VoteScreen;