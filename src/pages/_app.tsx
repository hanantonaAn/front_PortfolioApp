import { makeStore } from "@/store/store";
import "@/styles/globals.css";
import 'react-quill/dist/quill.snow.css';
import { ThemeProvider } from "@material-tailwind/react";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}


export default function App({ Component, ...rest }: AppPropsWithLayout) {

  const store = makeStore();

  const getLayout = Component.getLayout || ((page) => page);
  return (
    <ThemeProvider>
      <Provider store={store}>
        {getLayout(
          <Component {...rest} />
        )}
        <Toaster containerStyle={{ zIndex: '999999'}} />
      </Provider>
    </ThemeProvider>
  );
}
