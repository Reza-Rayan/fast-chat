import Head from "next/head";
import Link from "next/link";

// MUI Componenta
import { Typography, Button, Box } from "@mui/material";
import { PersonAdd, Login } from "@mui/icons-material";

const Home = () => {
  return (
    <>
      <Head>
        <title>Home Page | Fast Chat</title>
      </Head>
      <div className="flex flex-col items-center justify-center  mt-20 h-[500px] ">
        <Typography
          variant="h1"
          className="text-3xl font-bold text-slate-600 italic"
        >
          Join our Community
        </Typography>

        <Box className="mt-10 flex gap-10">
          <Link href={"/sign-up"}>
            <Button variant="outlined" startIcon={<PersonAdd />}>
              Register
            </Button>
          </Link>
          <Link href={"/login"}>
            <Button
              variant="text"
              LinkComponent={"/chat"}
              className="text-white bg-indigo-600 shadow-md hover:text-indigo-600"
              startIcon={<Login />}
            >
              Login
            </Button>
          </Link>
        </Box>
      </div>
    </>
  );
};

export default Home;
