import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const BASE_URL = "http://localhost:8000";
const API_BASE_URL = "http://localhost:8000/api";
const socket = io(`${BASE_URL}`);

const PersonalChat = () => {
  const [userid, setUserId] = useState("");
  const [username, setUserName] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

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
    const user_id = localStorage.getItem("user_id");

    console.log("token = ", token);
    console.log("user_id = ", user_id);


    fetch(`${API_BASE_URL}/all-users/${user_id}`, {
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
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleUserSelection = (user) => {
    setSelectedUser(user);
  };

  const sendPersonalMessage = () => {
    if (selectedUser) {
      const senderId = localStorage.getItem("user_id");

      socket.emit("personal-message", {
        message: inputValue,
        sender_name: username,
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
          sender_name: username,
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
      <div>
        <div>
          <h2>{username}</h2>

          <div>
            <div>Click on username to chat with him</div>
            {users.map((user) => (
              <>
                <p
                  key={user._id}
                  onClick={() => {
                    handleUserSelection(user);
                  }}
                >
                  {user.email}
                </p>
              </>
            ))}
            <hr />
          </div>
        </div>

        <div>
          <div>{selectedUser && <p>{selectedUser.email}</p>}</div>

          <div>
            {messages.map((message, index) => (
              <>
                {message.sender_id === userid ? (
                  <>
                    <div>
                      <p key={index}>
                        <div>{message.message}</div>
                        <span>
                          {new Date(message.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </span>
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p key={index}>
                        <p>{message.message}</p>

                        <p>
                          {new Date(message.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </p>
                      </p>
                    </div>
                  </>
                )}
              </>
            ))}
          </div>

          <div>
            <input
              placeholder="Type your message here.."
              type="text"
              value={inputValue}
              onChange={handleInputChange}
            />

            <button onClick={sendPersonalMessage} disabled={!selectedUser}>
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalChat;
