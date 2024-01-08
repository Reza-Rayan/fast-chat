import Head from "next/head";

// Costom Components
import Messages from "../../components/messages/Messages";
import Sidebar from "../../components/sidebar/Sidebar";

const Chat = () => {
  return (
    <>
      <Head>
        <title>Chat With your Friends | Fast Chat</title>
      </Head>
      <main className="flex flex-col px-10   items-center justify-center min-h-screen bg-gray-900 text-white w-full">
        <div className="grid lg:grid-cols-12 gap-x-6 w-full">
          <div className="col-span-2 shadow-lg rounded-lg overflow-hidden">
            <Sidebar />
          </div>
          <div className="col-span-10 overflow-hidden rounded-lg shadow-lg ">
            <Messages />
          </div>
        </div>
      </main>
    </>
  );
};

export default Chat;
