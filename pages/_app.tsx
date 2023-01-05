import "../styles/globals.css";
import type { AppProps } from "next/app";
import { wrapperStore } from "../state-mgt/store";
import { Provider } from "react-redux";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, ...rest }: AppPropsWithLayout) {
  const { store, props } = wrapperStore.useWrappedStore(rest);

  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(
    <Provider store={store}>
      {/*@ts-ignore*/}
      <Component {...rest} />
    </Provider>
  );
}

export default MyApp;
