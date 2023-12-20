import React from "react";

import Sidebar from "../components/Sidebar";
import MessageForm from "../components/MessageForm";

function Chat() {
    return (
        <main >
            <div className="grid grid-cols-12 mx-20 mt-2 gap-2">
                <div className="col-span-3">
                    <Sidebar />
                </div>
                <div className="col-span-9">
                    <MessageForm />
                </div>
            </div>
        </main>
    );
}

export default Chat;
