import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import * as yup from "yup";
import { useFormik } from "formik";
// Logo image
import LogoImg from "@/public/logo.png";

// MUI Componenta
import {
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  InputLabel,
  OutlinedInput,
  FormControl,
  Avatar,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PageviewIcon from "@mui/icons-material/Pageview";
import AddIcon from "@mui/icons-material/Add";

// Redux Slices
import { signup } from "@/redux/features/auth-slice";
import { useDispatch } from "react-redux";

const Signup = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Define States
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [successSnackbarMessage, setSuccessSnackbarMessage] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //   Client Validation
  const validationSchema = yup.object({
    username: yup
      .string()
      .required("Username is required")
      .min(4, "Username should have at least 4 characters"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: yup
      .string()
      .required("Phone number is required")
      .matches(/^09\d{9}$/, "Invalid phone number"),
    password: yup.string().required("Password is required"),
  });

  const uploadImage = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "dumhym99");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dtd7mbljp/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();
      return result.secure_url;
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      throw error;
    }
  };

  //   Form Handler Fn
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const imageUrl = await uploadImage(avatar);

        const response = await dispatch(
          signup({ ...values, avatar: imageUrl })
        );

        if (response && response.meta.requestStatus === "rejected") {
          setSnackbarMessage("This Email Already Exists");
          setSnackbarOpen(true);
        } else {
          setSuccessSnackbarMessage("Registration completed successfully!");
          setSuccessSnackbarOpen(true);
          setTimeout(() => {
            router.push("/chat");
          }, 3000);
        }
      } catch (error) {
        console.error(error);
        setSnackbarMessage("This Email Already Exists");
        setSnackbarOpen(true);
      }
    },
  });

  //   Upload Image Handler Fn
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Check file type (allow only images)
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        setSnackbarMessage("Invalid type of Avatar");
        setSnackbarOpen(true);
        return;
      }

      // Check file size (limit to 2MB)
      const maxSize = 1 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        setSnackbarMessage(
          "File size exceeds the limit. Please upload a smaller image."
        );
        setSnackbarOpen(true);
        return;
      }
      setAvatar(file);
    }
  };

  // Snackbar Close Handler Fn
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Head>
        <title>Sign Up Page | Fast Chat</title>
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen bg-slate-800 text-white gap-2">
        <div className=" items-center">
          <Link href={"/"}>
            <Image
              src={LogoImg}
              width={80}
              alt="fast chat"
              className="mx-auto"
            />
          </Link>
          <Typography
            variant="h1"
            className="text-3xl font-bold text-slate-100 italic"
          >
            Sign In your Account
          </Typography>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="mt-4 lg:w-[40%] md:lw-[50%] w-[90%] mx-auto p-4 bg-white shadow-md rounded-lg flex flex-col gap-y-4"
        >
          {/* Upload Image Section */}
          <div className="flex justify-center gap-6">
            <div>
              <input
                type="file"
                accept="image/*"
                id="avatar"
                style={{ display: "none" }}
                onChange={handleAvatarChange}
              />
            </div>
            <div>
              {avatar ? (
                <div className="relative">
                  <label htmlFor="avatar">
                    <AddIcon className="cursor-pointer text-white bg-indigo-600 rounded-full shadow-md absolute bottom-0 left-4 z-10" />
                  </label>
                  <Avatar
                    src={
                      avatar instanceof File
                        ? URL.createObjectURL(avatar)
                        : avatar
                    }
                    alt="Avatar"
                    className="w-32 h-32"
                  />
                </div>
              ) : (
                <div className="relative">
                  <label htmlFor="avatar">
                    <AddIcon className="cursor-pointer text-white bg-indigo-600 rounded-full shadow-md absolute bottom-0 left-4 z-20" />
                  </label>
                  <Avatar className="w-32 h-32 bg-slate-400">
                    <PageviewIcon fontSize="large" />
                  </Avatar>
                </div>
              )}
            </div>
          </div>
          <div>
            <TextField
              label="name"
              size="small"
              type="text"
              fullWidth
              {...formik.getFieldProps("username")}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
          </div>
          <div className="lg:flex grid grid-cols-1 gap-6">
            <TextField
              size="small"
              label="Email Address"
              type="email"
              fullWidth
              {...formik.getFieldProps("email")}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              label="Phone Number"
              size="small"
              type="tel"
              fullWidth
              {...formik.getFieldProps("phoneNumber")}
              error={
                formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
              }
              helperText={
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
            />
          </div>
          <div>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                size="small"
                {...formik.getFieldProps("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </div>
          <div>
            <Button
              fullWidth
              type="submit"
              size="small"
              className="bg-indigo-600 text-white py-2 hover:text-indigo-600"
              variant="outlined"
            >
              Register
            </Button>
          </div>
          <Typography variant="caption" color={"#3d3d3d"} align="center">
            Do you have an account?{" "}
            <Link href={"/login"} className="text-indigo-600">
              Sign In
            </Link>
          </Typography>
          {/* Snackbar for File Size Exceeded */}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            message={snackbarMessage}
          />
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={() => setSnackbarOpen(false)}
            message={snackbarMessage}
          />

          {/* Snackbar for success messages */}
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            open={successSnackbarOpen}
            autoHideDuration={6000}
            onClose={() => setSuccessSnackbarOpen(false)}
          >
            <SnackbarContent
              style={{ backgroundColor: "#4CAF50" }}
              message={successSnackbarMessage}
            />
          </Snackbar>
        </form>
      </main>
    </>
  );
};

export default Signup;
