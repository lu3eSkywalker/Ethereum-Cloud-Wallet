import '@/styles/globals.css'; // Your global styles
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../store/store'; // Adjust the path as needed

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
