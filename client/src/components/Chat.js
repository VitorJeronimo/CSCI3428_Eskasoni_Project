import { useEffect, useState } from "react";

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
            setMessageList((currentList) => [...currentList, messageData]);
        }
    };

    useEffect(() => {
        socket.on("recieve_message", (data) => {
            setMessageList((currentList) => [...currentList, data]);
        })
    }, [socket]);

    return (
        <div className = "Chat">
            <p className="ChatNotification">
                The Chat will be available soon...
            </p>
            <div className = "ChatBody">
                {messageList.map((messageContent) => {
                    return (
                    <div className="Message">
                        <div>
                            <div className="MessageContent">
                                <p>{messageContent.message}</p>
                            </div>
                            <div className="MessageMeta">
                                <p>{messageContent.time}</p>
                                <p>{messageContent.author}</p>
                            </div>
                        </div>
                    </div>
                    );
                })}
            </div>
            <div className = "ChatFooter">
                <input type="Text" placeholder="hey.."
                onClick={(event) => {
                    setCurrentMessage(event.target.value);
                }}/>
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    );
}
 
export default Chat;
