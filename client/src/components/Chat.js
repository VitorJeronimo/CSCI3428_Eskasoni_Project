import { useEffect, useState } from "react";
import styles from "./Chat.module.css";

const Chat = ({socket, userName, roomName}) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: roomName,
                author: userName,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + 
                ":" + new Date(Date.now()).getMinutes() 
            };

            await socket.emit("send_message", messageData);
        }
    };

    useEffect(()=>{
        socket.on("receive_message", (data) => {
            setMessageList((currentList) => [...currentList, data]);
            console.log("message received");
        });
    }, [socket]);    

    return (
        <div className = "Chat">
            <div className = {styles.chat_window}>
            <div className = {styles.chat_body}>
                {messageList.map((messageContent) => {
                    return (
                    <div className={styles.message}>
                        <div className={styles.message_meta}>
                            <p>{messageContent.author}</p>
                        </div>
                        <div>:</div>
                        <div className={styles.message_content}>
                            <p>{messageContent.message}</p>
                        </div>
                    </div>
                    );
                })}
            </div>
            <div className = {styles.chat_footer}>
                <input type="text" placeholder="hey.."
                onBlur={(event) => {
                    setCurrentMessage(event.target.value);
                }}/>
                <button onClick={sendMessage}>&#9658;</button>
            </div>
            </div>
        </div>
    );
}
 
export default Chat;
