import Head from "next/head";

// Costom Components
import Messages from "@/components/messages/Messages";
import Sidebar from "@/components/sidebar/Sidebar";

const Chat = () => {
  return (
    <>
      <Head>
        <title>Chat With your Friends | Fast Chat</title>
      </Head>
      <main className="lg:px-12 mt-6">
        <div className="grid lg:grid-cols-12 gap-x-6">
          <div className="col-span-3 shadow-lg rounded-lg overflow-hidden">
            <Sidebar />
          </div>
          <div className="col-span-9 overflow-hidden rounded-lg shadow-lg ">
            <Messages />
          </div>
        </div>
      </main>
    </>
  );
};

export default Chat;
