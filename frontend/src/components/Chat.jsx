import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

// const BASE_URL = "http://localhost:5000";
// const API_BASE_URL = "http://localhost:5000";
// const socket = io(${BASE_URL});

const Chat = () => {
//   const user = useSelector((state) => state.user);

  const [chats, setChats] = useState([]);
  const socket = useMemo(() => io("localhost:8000"), []);
  const { receiverId } = useParams();
//   const name = localStorage.getItem('user')
const name =  localStorage.getItem('user');
  const senderId = localStorage.getItem('user_id');

  // console.log('architr testing', senderId, receiverId)
  const [message, setMessage] = useState("");
// console.log(`sender ${senderId} receiver ${receiverId}`)
  const handleMessages = useCallback(
    (messageData) => {
        // console.log('listning to socket')
      const { sender, receiver } = messageData;
      if (sender === receiverId && receiver === senderId) {
        // console.log('in handle')
        fetch(`http://localhost:8000/getmsgs?sender=${sender}&receiver=${receiver}`)
          .then((res) => res.json())
          .then((result) => {console.log('res', result);setChats(result)});
      }
    },
    [receiverId, senderId]
  );
// console.log('chats', chats)
  useEffect(() => {
    socket.on("msgsolo", handleMessages);
    return () => {
      socket.off("msgsolo", handleMessages);
    };
  }, [socket, handleMessages]);

  useEffect(() => {
    fetch(`http://localhost:8000/getmsgs?sender=${senderId}&receiver=${receiverId}`)
      .then((res) => res.json())
      .then((result) => setChats(result));
  }, []);
  const sendMessage = () => {
    if (message) {
      const messageData = {
        sender: senderId,
        receiver: receiverId,
        message: message,
      };
      socket.emit("msgsolo", messageData);
      if (messageData.sender && messageData.receiver) {
        axios.post("http://localhost:8000/setchats", {
            ...messageData,
        }, {
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': '*', 
                'Content-Type': 'application/json'}
            })
          .then((response) => setChats(response.data))
      }

      setMessage("");
    }
  };
  return (
    <div className="flex h-screen bg-gradient-to-r from-teal-200 to-blue-200">
      <div className="flex flex-col flex-auto bg-white w-3/5 mx-auto rounded-lg shadow-xl">
        <div className="overflow-y-auto p-4 flex-grow">
          {chats && chats.length > 0 ? (
            chats.map((chat, i) => {
              if (
                (chat.sender === senderId && chat.receiver === receiverId) ||
                (chat.receiver === senderId && chat.sender === receiverId)
              ) {
                const formattedDate = new Date(
                  chat.createdAt
                ).toLocaleDateString();
                const formattedTime = new Date(
                  chat.createdAt
                ).toLocaleTimeString();
                return (
                  <div
                    key={i}
                    className={`flex  ${
                      chat.sender === senderId ? "justify-end" : "justify-start"
                    } mb-4`}
                  >
                    <div
                      className={`flex items-center ${
                        chat.sender === senderId
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      {/* {chat.sender !== senderId && (
                        <img
                          src={"https://unsplash.com/s/photos/human"}
                          alt={""}
                          className="w-8 h-8 rounded-full mr-2"
                        />
                      )} */}
                      <div
                        className={`flex items-center justify-center p-3  rounded-lg text-white ${
                          chat.sender === senderId
                            ? "bg-teal-500"
                            : "bg-blue-500"
                        }`}
                        
                        style={{ minWidth: "5%" }}
                      >
                        <div >
                          {" "}
                          <h1 className="text-xl">{name}</h1>
                          <p className=""> {chat.message}</p>
                        </div>

                        <div className="text-right text-xs ml-2 text-gray-500 ">
                          {formattedTime}, {formattedDate}
                        </div>
                      </div>
                      {/* {chat.sender === senderId && (
                        <img
                          src={""}
                          alt={""}
                          className="w-8 h-8 rounded-full ml-2"
                        />
                      )} */}
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">No messages yet</p>
            </div>
          )}
        </div>
        <div className="flex items-center p-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-auto p-2 mr-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter your message"
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;