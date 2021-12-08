import { useEffect, useState, useRef } from "react";
import styles from "./Chat.module.css";

const Chat = ({socket, userName, roomName}) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const messagesEndRef = useRef(null)

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
            setMessageList((currentList) => [...currentList, messageData]);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }

    useEffect( scrollToBottom, [messageList]);

    useEffect(()=>{
        socket.on("receive_message", (data) => {
            setMessageList((currentList) => [...currentList, data]);
        });
    }, [socket]);    


    return (
        <div className = "Chat">
            <p className="ChatNotification">
                The Chat will be available soon...
            </p>
            <div className = "ChatBody">
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
                <div ref={messagesEndRef}/>
            </div>
            <div className = {styles.chat_footer}>
                <input type="text" placeholder="hey.."
                onBlur={(event) => {
                    setCurrentMessage(event.target.value);
                }}/>
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    );
}
 
export default Chat;
