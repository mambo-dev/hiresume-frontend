import "../styles/globals.css";
import type { AppProps } from "next/app";
import { wrapperStore } from "../state-mgt/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }: AppProps) {
  const { store, props } = wrapperStore.useWrappedStore(pageProps);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
