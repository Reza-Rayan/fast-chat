import React from "react";
import { TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ChatForm = ({ handleSubmit, setMessage, message }) => {
  return (
    <form onSubmit={handleSubmit} className="flex pl-6 pb-2">
      <TextField
        id="outlined-basic"
        label="Type your message..."
        variant="outlined"
        fullWidth
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button type="submit">
        <SendIcon />
      </Button>
    </form>
  );
};

export default ChatForm;
