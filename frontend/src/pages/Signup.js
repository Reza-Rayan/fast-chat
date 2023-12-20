import React, { useState } from "react";
import { useSignupUserMutation } from "../services/appApi";
import "./Signup.css";
import botImg from "../assets/bot.jpeg";

import {AddPhotoAlternate} from "@mui/icons-material"

import { Link, useNavigate } from "react-router-dom";
import { Container, Grid, Typography, TextField, Button, CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";


const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("REmail is required"),
    password: Yup.string().required("Password isequired").min(4,"Password should have at least 4 characters"),
  });

function Signup() {
    const [image, setImage] = useState(null);
    const [uploadingImg, setUploadingImg] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [signupUser, { isLoading, error }] = useSignupUserMutation();
    const navigate = useNavigate();


    const formik = useFormik({
        initialValues: {
          name: "",
          email: "",
          password: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
          try {
            if (!image) return alert("Please upload your profile picture");
            const url = await uploadImage(image);
            await signupUser({ ...values, picture: url });
            navigate("/chat");
          } catch (error) {
            console.error(error);
          }
        },
      });
    const validateImg = (e) => {
        const file = e.target.files[0];
        if (file.size >= 1048576) {
        return alert("Max file size is 1mb");
        } else {
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
        }
    };

    const uploadImage = async () => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "your-preset-here");
        try {
        setUploadingImg(true);
        let res = await fetch("https://api.cloudinary.com/v1_1/your-username-here/image/upload", {
            method: "post",
            body: data,
        });
        const urlData = await res.json();
        setUploadingImg(false);
        return urlData.url;
        } catch (error) {
        setUploadingImg(false);
        console.log(error);
        }
    };

    return (
        <Container>
      <div className="container mx-auto grid grid-cols-7">
        <div className="col-span-4 flex flex-col justify-center">
          <form onSubmit={formik.handleSubmit} style={{ width: "100", maxWidth: 500 }} className="mt-4 bg-white py-6 px-4 shadow-lg rounded-lg">
            <Typography variant="h4" className="text-center mb-4">
              Create account
            </Typography>

            <div className="mb-3">
              <div className="signup-profile-pic__container">
                <img src={imagePreview || botImg} className="signup-profile-pic" />
                <label htmlFor="image-upload" className="image-upload-label">
                 <AddPhotoAlternate width={14} className="absolute top-0 text-white bg-indigo-600 p-1 rounded-full cursor-pointer shadow-lg" />
                </label>
                <input type="file" id="image-upload" hidden accept="image/png, image/jpeg" onChange={validateImg} />
              </div>
            </div>

            {error && <p className="alert alert-danger">{error.data}</p>}
            <div className="mb-3">
                <label htmlFor="name" className="mb-[-20px]">Username:</label>
                <TextField
                fullWidth
                id="name"
                variant="outlined"
                margin="normal"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                />
            </div>
           <div className="mb-3">
            <label htmlFor="email" className="mb-[-20px]">Email:</label>
                <TextField
                fullWidth
                id="email"
                variant="outlined"
                margin="normal"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                />
           </div>

            <label htmlFor="password" className="mb-[-20px]">Password:</label>
            <TextField
              fullWidth
              id="password"
              type="password"
              variant="outlined"
              margin="normal"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />

            <div>
                <Button variant="contained" color="primary" type="submit" disabled={uploadingImg || isLoading}>
                {uploadingImg || isLoading ? <CircularProgress size={24} color="inherit" /> : "Signup"}
                </Button>
            </div>

            <div className="py-4">
              <Typography variant="body2" className="text-center">
                Already have an account? <Link to="/login">Login</Link>
              </Typography>
            </div>
          </form>
        </div>
        <div className="signup__bg col-span-3 mt-3 rounded-lg shadow-lg"></div>
      </div>
    </Container>
    );
}

export default Signup;
