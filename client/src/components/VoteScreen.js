// Author: Gillom McNeil (A00450414)

import WordList from "./WordList";
import { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const VoteScreen = ({socket}) => {
    //===== STATES ============================================================
    const [currentCategory, setCurrentCategory] = useState("");
    const [answers, setCurrentAnswers] = useState([]);
    const [categoryNumber, setCategoryNumber] = useState(0);
    const location = useLocation();

    //===== EFFECTS ===========================================================
    //this will only run on the first render, getting the ball rolling
    //subsequent calls will be done by the 'next' button
    useEffect(() => {
        socket.emit('request_category/answers', categoryNumber);
    }, [location]);

    //===== EVENT HANDLING ====================================================
    socket.on("receive_category/answers", (answers) => {
        //set the new currentCategory
        setCurrentCategory(answers[0].category);
        //update the answers state and re-render the app
        setCurrentAnswers(answers.slice(1));
    });

    // socket.on("receive_updated_scores", (answers) => {
    //     setCurrentAnswers(answers.slice(1));
    // });

    //===== EVENT EMISSION ====================================================
    const handleNextCategory = () => {
        setCategoryNumber(categoryNumber + 1);
        socket.emit('request_category/answers', categoryNumber);
    };

    const vote = (scoreDifference, player) => {
        //socket.emit("updateVoteScore", answers, player, scoreDifference);
    };

    //===== COMPONENT =========================================================
    return (
        <div className="VoteScreen">
            <div className="VoteCard">
                <div className="VoteCardTitle">
                    <h2 className="CategoryTitle">{currentCategory}</h2>
                    <button className="NextCategorybtn"
                        onClick={handleNextCategory}>Next</button>
                </div>
                <WordList answers={answers} vote={vote}/>
            </div>
        </div>
    );
}

export default VoteScreen;
