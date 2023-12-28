import { useFormik } from "formik";

// MUI Components
import { TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ChatFrom = () => {
  // Form Handler Fn
  const formik = useFormik({
    initialValues: {
      message: "",
    },
    onSubmit: (values, { resetForm }) => {
      // Handle form submission here
      console.log("Form submitted with values:", values);
      // Reset the form after submission
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex  pl-6 pb-2">
      <TextField
        id="outlined-basic"
        label="type your message ..."
        variant="outlined"
        fullWidth
        name="message"
        value={formik.values.message}
        onChange={formik.handleChange}
      />
      <Button type="submit">
        <SendIcon />
      </Button>
    </form>
  );
};

export default ChatFrom;
