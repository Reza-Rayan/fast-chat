import React, { useContext, useState } from "react";
import { useLoginUserMutation } from "../services/appApi";
import "./Login.css";
import { AppContext } from "../context/appContext";


import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { Container, TextField, Button, CircularProgress } from "@mui/material";

const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("email is required"),
    password: Yup.string().required("Password is required"),
  });

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { socket } = useContext(AppContext);
    const [loginUser, { isLoading, error }] = useLoginUserMutation();

 const initialValues = {
    email: "",
    password: "",
  };

  const handleLogin = async (values) => {
    try {
      const { data } = await loginUser(values);
      if (data) {
        socket.emit("new-user");
        navigate("/chat");
      }
    } catch (error) {
      // Handle errors, e.g., display error messages
    }
  };


    return (
        <Container>
         <div className="grid grid-cols-7 gap-3">
            <div className="login__bg col-span-3 rounded-lg shadow-lg mt-10"></div>
            <div  className="flex items-center col-span-4">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
            >
                <Form style={{ width: "80%", maxWidth: 500 }} className="bg-white shadow-lg px-6 py-4 rounded-lg">
                    <h2 className="font-semibold text-slate-600 mb-4">Login your acount</h2>
                {error && <p className="bg-red-400 text-white px-6 py-3 rounded-lg">{error.data}</p>}
                <div className="mb-3">
                    <label>Email address</label>
                    <Field
                    type="email"
                    name="email"
                    as={TextField}
                    placeholder="Enter email"
                    required
                    fullWidth
                    />
                    <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-[14px] mt-2"
                    />
                </div>

                <div className="mb-3">
                    <label>Password</label>
                    <Field
                    type="password"
                    name="password"
                    as={TextField}
                    placeholder="Password"
                    required
                    fullWidth
                    />
                    <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-[14px] mt-2"
                    />
                </div>

                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? (
                    <CircularProgress size={24} color="inherit" />
                    ) : (
                    "Login"
                    )}
                </Button>

                <div className="py-4">
                    <p className="text-center">
                    Don't have an account? <Link to="/signup">Signup</Link>
                    </p>
                </div>
                </Form>
            </Formik>
            </div>
      </div>
    </Container>
    );
}

export default Login;
