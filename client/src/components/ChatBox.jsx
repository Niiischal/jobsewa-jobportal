import React, { useEffect, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import InputEmoji from "react-input-emoji";
import { format } from "timeago.js";
import { AddMessage, GetMessages } from "../apicalls/messages";
import { GetUser } from "../apicalls/users";

function ChatBox({ chat, currentUser, setSendMessage, receiveMessage }) {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState("");
  const scroll = useRef();

  const handleChange = (newMessages) => {
    setNewMessages(newMessages);
  };

  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await GetUser(userId);
        setUserData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  //fetching data for messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await GetMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);

  //always scrolling to the last message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessages,
      chatId: chat._id,
    };
    // sending message to socket server
    const receiverId = chat.members.find((id) => id !== currentUser);
    setSendMessage({ ...message, receiverId });

    // sending message to database
    try {
      const { data } = await AddMessage(message);
      setMessages([...messages, data]);
      setNewMessages("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (receiveMessage !== null && receiveMessage.chatId === chat._id)
      setMessages([...messages, receiveMessage]);
  }, [receiveMessage]);

  return (
    <div className="rounded grid grid-rows-[14vh,60vh,13vh]">
      {chat ? (
        <>
          <div className="flex flex-col p-4 gap-2 bg-gray-100">
            <div className="flex rounded">
              <div className="relative mr-2 w-10 h-10 flex flex-col items-center">
                <CgProfile size={50} />
              </div>
              <div className="flex items-center">
                <span className="text-lg font-semibold">{userData?.name}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-6 overflow-y-auto">
            {messages.map((message) => (
              <div
                ref={scroll}
                className={`message ${
                  message.senderId === currentUser
                    ? "bg-primary"
                    : "bg-[#343a40]"
                } text-white p-3 rounded-[1rem] max-w-[28rem] w-[fit-content] flex flex-col gap-2 ${
                  message.senderId === currentUser ? "self-end" : ""
                }`}
              >
                <span className="text-[15px]">{message.text}</span>
                <span className="text-[10px] self-end">
                  {format(message.createdAt)}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center p-2 bg-gray-100 rounded-[1rem] border">
            <InputEmoji
              value={newMessages}
              onChange={handleChange}
              inputClassName="bg-[#ececec] rounded-[0.5rem] outline-none flex-1 text-sm p-3"
            />
            <div
              className="bg-primary rounded-[0.5rem] flex items-center justify-center cursor-pointer p-3 text-white"
              onClick={handleSend}
            >
              Send
            </div>
          </div>
        </>
      ) : (
        <span className="flex justify-center items-center">
          Tap on a Chat to start Conversation...
        </span>
      )}
    </div>
  );
}

export default ChatBox;
