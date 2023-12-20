import React from "react";
import {  Button } from "@mui/material";
import {Link} from 'react-router-dom'
import "./Home.css";
import {PlayIcon} from '@heroicons/react/solid';

function Home() {
    return (
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2">
            <div  className="d-flex flex-direction-column align-items-center justify-content-center">
                <div>
                    <h1>Share the world with your friends</h1>
                    <p>Fast Chat lets you connect with the world</p>
                    <Link to="/chat">
                        <Button variant="contained" className="flex items-center gap-2">
                            <span>Get Started</span>
                             <PlayIcon className="h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </div>
            <div  className=" rounded-lg mt-10 homeBg"></div>
        </div>
    );
}

export default Home;
