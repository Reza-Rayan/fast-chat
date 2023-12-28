import "@/styles/globals.css";

// Container Components
import Header from "@/components/Header";

import { ReduxProvider } from "@/redux/Provider";

export default function App({ Component, pageProps }) {
  return (
    <>
      <ReduxProvider>
        <Header />
        <Component {...pageProps} />
      </ReduxProvider>
    </>
  );
}
