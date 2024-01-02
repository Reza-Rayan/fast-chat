import React from "react";

const SingleMessage = ({ avatar, _id, content, username, time, user }) => {
  const isCurrentUser = user?._id === _id;
  return (
    <>
      <div className={`chat chat-start ${isCurrentUser ? "sent" : "received"}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              style={{
                width: 35,
                height: 35,
                objectFit: "cover",
                borderRadius: "50%",
                marginRight: 10,
              }}
              alt="your avatar"
              src={avatar}
            />
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-slate-500 text-[10px]">{time}</span>
          <p className="message-sender text-slate-600 text-sm font-medium">
            {isCurrentUser ? "You" : username}
          </p>
        </div>

        <div className="chat-bubble  text-white text-sm flex items-center">
          {content}
        </div>
      </div>
    </>
  );
};

export default SingleMessage;
