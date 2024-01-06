import React, { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/features/auth-slice";
// Custom Components
import { AppContext } from "@/context/appContext";

// Custom Components
import ChatForm from "../chatForm/ChatFrom";
import SingleMessage from "./SingleMessage";

// MUI Components
import { Button } from "@mui/material";

const Messages = () => {
  const [message, setMessage] = useState("");
  const user = useSelector(selectUser);
  const { socket, currentRoom, setMessages, messages, privateMemberMsg } =
    useContext(AppContext);
  const messageEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();

    month = month.length > 1 ? month : "0" + month;
    let day = date.getDate().toString();

    day = day.length > 1 ? day : "0" + day;

    return month + "/" + day + "/" + year;
  }

  function scrollToBottom() {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  const todayDate = getFormattedDate();

  socket.off("room-messages").on("room-messages", (roomMessages) => {
    setMessages(roomMessages);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) return;
    const today = new Date();
    const minutes =
      today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    const time = today.getHours() + ":" + minutes;
    const roomId = currentRoom;
    socket.emit("message-room", roomId, message, user, time, todayDate);
    setMessage("");
  };

  return (
    <div
      className="flex flex-col justify-between
    lg:min-h-[700px]  bg-slate-100 text-white rounded-lg w-full"
    >
      <div className="messages-output">
        {user && privateMemberMsg?._id && <></>}
        {!user && (
          <div className=" flex flex-col justify-center min-h-[600px] gap-10">
            <h2 className="text-3xl text-slate-600 text-center italic font-bold opacity-80">
              Please login
            </h2>
            <Button
              LinkComponent={"/login"}
              color="info"
              variant="outlined"
              className="w-[100px] mx-auto"
            >
              <Link href="/login">Login</Link>
            </Button>
          </div>
        )}

        {user &&
          messages.map(({ _id: date, messagesByDate }, idx) => (
            <div className="overflow-y-scroll   h-[650px] relative">
              <div key={idx}>
                <p className="alert w-[120px] mx-auto absolute z-10 left-[50%] top-0  ">
                  {date}
                </p>
                {messagesByDate?.map(
                  ({ content, time, from: sender }, msgIdx) => (
                    <div
                      className={
                        sender?.email == user?.email
                          ? "message"
                          : "incoming-message"
                      }
                      key={msgIdx}
                    >
                      <SingleMessage
                        key={msgIdx}
                        _id={sender._id}
                        avatar={sender.avatar}
                        content={content}
                        time={time}
                        username={sender.username}
                        user={user}
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        <div ref={messageEndRef} />
      </div>
      <ChatForm
        handleSubmit={handleSubmit}
        setMessage={setMessage}
        message={message}
      />
    </div>
  );
};

export default Messages;
