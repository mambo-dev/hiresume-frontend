import "../styles/globals.css";
import type { AppProps } from "next/app";
import { wrapperStore } from "../state-mgt/store";
import { Provider } from "react-redux";

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapperStore.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Component {...rest} />
    </Provider>
  );
}

export default MyApp;
