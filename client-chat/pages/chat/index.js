import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

// Costom Components
import ChatFrom from "@/components/chatForm/ChatFrom";
import Messages from "@/components/messages/Messages";

const Chat = () => {
  return (
    <>
      <Head>
        <title>Chat With your Friends | Fast Chat</title>
      </Head>
      <main className="lg:px-12 mt-6">
        <div className="grid lg:grid-cols-6 gap-x-6">
          <div className="col-span-2 shadow-lg">Sidebar</div>
          <div className="col-span-4 shadow-lg py -4 flex flex-col gap-y-6">
            <Messages />
            <ChatFrom />
          </div>
        </div>
      </main>
    </>
  );
};

export default Chat;
