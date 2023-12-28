import Head from "next/head";
import Link from "next/link";

const NotFound = () => {
  return (
    <>
      <Head>
        <title>404 Not Found Page</title>
      </Head>
      <main className="flex flex-col items-center justify-center min-h-[500px]">
        <h1 className="text-3xl font-bold text-slate-500">
          404 | Page Not Found
        </h1>
        <Link href={"/"} className="mt-10 bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md font-semibold"> Back to Home</Link>
      </main>
    </>
  );
};

export default NotFound;
