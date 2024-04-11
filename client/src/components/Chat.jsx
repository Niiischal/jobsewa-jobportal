import { message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { GetChatById } from "../apicalls/chats";
import { SetLoader } from "../redux/loadersSlice";
import ChatBox from "./ChatBox";
import Conversation from "./Conversation";

function Chat() {
  const { user } = useSelector((state) => state.users);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();
  const socket = useRef();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetChatById(user._id);
      dispatch(SetLoader(false));
      if (response.success) {
        setChats(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [user._id]);

  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  //sending message to the socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // receiving message from socket server
  useEffect(() => {
    socket.current.on("receiver-message", (data) => {
      setReceiveMessage(data);
    });
  }, []);

  const checkOnlineStatus =(chat)=> {
    const chatMembers = chat.members.find((member) => member!==user._id)
    const online = onlineUsers.find((user)=>user.userId ===chatMembers )
    return online ? true : false
  }

  return (
    <div className="flex gap-2">
      {/* Left side */}
      <div className="w-1/4">
        <div className="flex flex-col gap-4 p-4 bg-gray-100 rounded items-center">
          <h2 className="text-lg font-semibold">Chats</h2>
          <div className="flex felx-col gap-4">
            {chats.map((chat) => (
              <div onClick={() => setCurrentChat(chat)}>
                <Conversation data={chat} currentUser={user._id} online={checkOnlineStatus(chat)}/>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Right side */}
      <div className="w-3/4 flex flex-col gap-4">
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receiveMessage={receiveMessage}
        />
      </div>
    </div>
  );
}

export default Chat;
