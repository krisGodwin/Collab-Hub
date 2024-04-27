import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "../css/personalchat.css"
import Navbar from '../components/Navbar'
import {useParams} from "react-router-dom"

const BASE_URL = "http://localhost:8000";
const API_BASE_URL = "http://localhost:8000/api";
const socket = io(`${BASE_URL}`);

const SingleChat = () => {
  const [userid, setUserId] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [chats, viewChats] = useState(false);
  const { id } = useParams();


  const user_type = localStorage.getItem("user")
  const user_name = localStorage.getItem("username")
  console.log(user_name)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");

    console.log("token = ", token);
    console.log("user_id = ", user_id);

    fetch(`${API_BASE_URL}/user/${user_id}`, {
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {

        console.log(result)
    setUserId(user_id);
      });
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetch(
        `${API_BASE_URL}/all-personal-messages/${
          localStorage.getItem("user_id")
        }/${selectedUser._id}`
      )
        .then((response) => response.json())
        .then((data) => {
          setMessages(data);
        })
        .catch((error) => {
          console.error("Error fetching personal messages:", error);
        });

      socket.on("personal-message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }

    return () => {
      socket.off("personal-message");
    };
  }, [selectedUser]);

  useEffect(() => {
    if (userid) {
      socket.emit("add-user", userid);
    }
  }, [userid]);

  useEffect(() => {

    const token = localStorage.getItem("token");
    

    console.log("token = ", token);
    // console.log("user_id = ", user_id);

    if(user_type === "CC"){
      fetch(`${API_BASE_URL}/all-users/personal/${id}`, {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      } )
        .then((response) => response.json())
        .then((data) => {
          console.log("data = ", data);
  
          setUsers(data);
        })
        .catch((error) => {
          console.error("Error fetching personal users:", error);
        });
    } else {
      fetch(`${API_BASE_URL}/content/personal/${id}`, {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      } )
        .then((response) => response.json())
        .then((data) => {
          console.log("data = ", data);
  
          setUsers(data);
        })
        .catch((error) => {
          console.error("Error fetching personal users:", error);
        });
    }
   
  }, [user_type, id]);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleUserSelection = (user) => {
    setSelectedUser(user);
  };

  const sendPersonalMessage = () => {
    if (selectedUser) {
      const senderId = localStorage.getItem("user_id");
      console.log(selectedUser)
      socket.emit("personal-message", {
        message: inputValue,
        sender_name: user_name,
        receiver_name: selectedUser.name,
        sender_id: senderId,
        receiver_id: selectedUser._id,
        createdAt: new Date().toISOString(),
      });

      fetch(`${API_BASE_URL}/save-personal-message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputValue,
          sender_name: user_name,
          receiver_name: selectedUser.name,
          sender_id: senderId,
          receiver_id: selectedUser._id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {})
        .catch((error) => {
          console.error("Error saving personal message:", error);
        });

      setInputValue("");
    }
  };

  return (
    <>
    <Navbar />
  <div className="perschat">
    <div>
      <div className="bodyy">
        <div className="chatcont">
          <div className="cinfo">
            <div className="myinfo">
              {/* <img id="profpicc" src="./profileimage.jpg" alt="" srcset="" /> */}
              <h2>{user_name}</h2>
            </div>
            <div className="userss">
              {users.map((user) => (
                <>
                  <p
                    key={user._id}
                    onClick={() => {
                      handleUserSelection(user);
                      viewChats("active");
                    }}
                  > 
                   {user.name}
                  </p>
                  <hr />
                </>
              ))}
            </div>
          </div>
          <hr id="midhr" />
{/* Div for message */}
          <div className={`selchat ${chats && "active"}`}>
            <div className="seluser">
              {selectedUser && (
                <div className="userssasd">
                  <img
                    onClick={() => {
                      viewChats(false);
                    }}
                    id="sdbackpn"
                    src="./back.png"
                    alt=""
                  />
                  <img
                    id="profpicc"
                    src="./profile-pic.png"
                    alt=""
                    srcset=""
                  />
                  <p>{selectedUser.name}</p>
                </div>
              )}
            </div>
            <div className="messages">
              {messages.map((message, index) => (
                <>
                  {message.sender_id === userid ? (
                    <>
                      <div className="sender-mess">
                        <p className="flexdisp" key={index}>
                          <p>{message.message}</p>
                          <div className="datemesss">
                            {new Date(message.createdAt).toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              }
                            )}
                          </div>
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="received-msg">
                        <p className="flexdisp" key={index}>
                          <p>{message.message}</p>
                          <div className="datemess">
                            {new Date(message.createdAt).toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              }
                            )}
                          </div>
                        </p>
                      </div>
                    </>
                  )}
                </>
              ))}
            </div>
            <div className="submitmenu">
              <input
                placeholder="Type your message here.."
                type="text"
                value={inputValue}
                onChange={handleInputChange}
              />
              <button
                onClick={sendPersonalMessage}
                disabled={!selectedUser}
                className="button"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</>

  );
};

export default SingleChat;
