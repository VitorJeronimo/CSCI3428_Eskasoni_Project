// Author: Gillom McNeil (A00450414)

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
    }, [location]);

    //this will handle distributing the new category/ answers into the components
    socket.on("receive_category/answers", (answers) => {
        //set the new currentCategory
        setCurrentCategory(answers[0].category);
        setCurrentAnswers(answers.slice(1));
    });

    // socket.on("receive_updated_scores", (answers) => {
    //     setCurrentAnswers(answers.slice(1));
    // });

    const handleNextCategory = () => {
        setCategoryNumber(categoryNumber + 1);
        socket.emit('request_category/answers', categoryNumber);
    };

    const vote = (scoreDifference, player) => {
        //socket.emit("updateVoteScore", answers, player, scoreDifference);
    };

    return (
        <div className="VoteScreen">
            <div className="VoteCard">
                <div className="VoteCardTitle">
                    <h2 className="CategoryTitle">{currentCategory}</h2>
                    <button className="NextCategorybtn" onClick={handleNextCategory}>Next</button>
                </div>
                <WordList answers={answers} vote={vote}/>
            </div>
        </div>
    );
}

export default VoteScreen;
