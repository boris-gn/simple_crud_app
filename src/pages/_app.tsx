import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { store } from "@/store/store";

import "@/styles/globals.css";

interface CustomSession extends Session {
  id: string;
}

interface PageProps {
  session?: CustomSession | null;
  [key: string]: unknown;
}

const App = ({ Component, pageProps }: { Component: React.ComponentType<PageProps>; pageProps: PageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}

export default App;
