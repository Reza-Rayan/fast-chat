import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import * as yup from "yup";
import { useFormik } from "formik";
// Logo image
import LogoImg from "../../public/logo.png";

// MUI Componenta
import {
  Typography,
  Button,
  TextField,
  Snackbar,
  SnackbarContent,
} from "@mui/material";

//Redux Handler
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/auth-slice";

const Login = () => {
  // Define States
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [successSnackbarMessage, setSuccessSnackbarMessage] = useState("");
  const [snackBar, setSnackbar] = useState(false);
  const [snackBarMessage, setSnackbarMessage] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  const validationSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // Handle form submission
        const response = await dispatch(login(values));
        console.log(response);
        if (response && response.meta.requestStatus === "rejected") {
          setSnackbar(true);
          setSnackbarMessage("Email or Password is wrong");
        } else {
          // Show success Snackbar
          setSuccessSnackbarMessage("Registration completed successfully!");
          setSuccessSnackbarOpen(true);
          setTimeout(() => {
            router.push("/chat");
          }, 2000);
        }
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
  });

  // Snackbar Close Handler Fn
  const handleSuccessSnackbarClose = () => {
    setSuccessSnackbarOpen(false);
  };
  const snackBarMessageClose = () => {
    setSnackbar(false);
  };
  return (
    <>
      <Head>
        <title>Login Page | Fast Chat</title>
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen bg-slate-800 text-white gap-2">
        <Image src={LogoImg} width={80} alt="fat chat" />
        <div className="flex gap-4 items-center">
          <Typography
            variant="h1"
            className="text-3xl font-bold text-slate-100 italic"
          >
            Sign In your Account
          </Typography>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="mt-4 lg:w-[30%] w-[90%] mx-auto py-6 px-4 bg-white shadow-md rounded-lg flex flex-col gap-y-6"
        >
          <div className="flex gap-4">
            <TextField
              label="Email Address"
              type="email"
              name="email"
              fullWidth
              {...formik.getFieldProps("email")}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </div>
          <div>
            <TextField
              label="Password"
              type="password"
              name="password"
              fullWidth
              {...formik.getFieldProps("password")}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </div>
          <div>
            <Button
              fullWidth
              type="submit"
              className="bg-indigo-600 text-white py-4 hover:text-indigo-600"
              variant="outlined"
            >
              Sign In
            </Button>
          </div>
          <Typography variant="caption" color={"#212121"} align="center">
            You don't have an account?{" "}
            <Link href={"/sign-up"} className="text-indigo-600">
              Sign up
            </Link>
          </Typography>
        </form>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          open={successSnackbarOpen}
          autoHideDuration={6000}
          onClose={handleSuccessSnackbarClose}
        >
          <SnackbarContent
            style={{ backgroundColor: "#4CAF50" }}
            message={successSnackbarMessage}
          />
        </Snackbar>
        {/* Handle Error of email or password wrong */}
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={snackBar}
          autoHideDuration={3000}
          onClose={snackBarMessageClose}
        >
          <SnackbarContent message={snackBarMessage} />
        </Snackbar>
      </main>
    </>
  );
};

export default Login;
