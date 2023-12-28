// Custom Components
import Message from "./Message";

const Messages = () => {
  return (
    <div className="border lg:min-h-[640px] overflow-y-scroll bg-slate-600 text-white rounded-lg w-full">
      <Message />
    </div>
  );
};

export default Messages;
