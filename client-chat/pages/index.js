import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

// MUI Componenta
import { IconButton } from "@mui/material";
import { PersonAdd, Login, GitHub } from "@mui/icons-material";

import LogoImage from "../public/logo.png";

const Home = () => {
  return (
    <>
      <Head>
        <title>Home Page | Fast Chat</title>
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen bg-slate-800 text-white gap-2">
        <Image src={LogoImage} alt="fast chat" width={80} />
        <h1 className="text-3xl font-bold text-center">
          Welcome to the Fast Chat Application
        </h1>
        <div className="lg:container mx-4  grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 w-full">
          <Link
            href={"/login"}
            className="border border-[#eeeeee] p-6 rounded-xl flex flex-col items-center justify-center
            hover:border-sky-300 hover:shadow-sky-200 hover:shadow-sm transition-all hover:text-sky-300"
          >
            <IconButton className="text-white text-2xl" n size="large">
              <Login width={80} />
            </IconButton>
            <h2 className="font-semibold italic">Login Page</h2>
          </Link>
          <Link
            href={"/sign-up"}
            className="border border-[#eeeeee] p-6 rounded-xl flex flex-col items-center justify-center
             hover:border-yellow-300 hover:shadow-yellow-200 hover:shadow-sm transition-all hover:text-yellow-300"
          >
            <IconButton className="text-white text-2xl " size="large">
              <PersonAdd width={80} />
            </IconButton>
            <h2 className="font-semibold italic">Sign up Page</h2>
          </Link>
        </div>

        <footer className="flex gap-2 items-center  absolute bottom-2 font-medium justify-center">
          See Reppository in{" "}
          <Link href={"#"} className="transition-all hover:text-indigo-500">
            <GitHub /> <span className="mt-10">GitHub</span>
          </Link>
        </footer>
      </main>
    </>
  );
};

export default Home;
