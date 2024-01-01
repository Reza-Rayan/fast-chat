import "@/styles/globals.css";
import { AppContext, socket } from "@/context/appContext";
import { useState } from "react";

// Container Components
import Header from "@/components/Header";

import { ReduxProvider } from "@/redux/Provider";

export default function App({ Component, pageProps }) {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMemberMsg, setPrivateMemberMsg] = useState({});
  const [newMessages, setNewMessages] = useState({});
  return (
    <>
      <ReduxProvider>
        <AppContext.Provider
          value={{
            socket,
            currentRoom,
            setCurrentRoom,
            members,
            setMembers,
            messages,
            setMessages,
            privateMemberMsg,
            setPrivateMemberMsg,
            rooms,
            setRooms,
            newMessages,
            setNewMessages,
          }}
        >
          <Header />
          <Component {...pageProps} />
        </AppContext.Provider>
      </ReduxProvider>
    </>
  );
}
