import "../styles/globals.css";
import "@near-wallet-selector/modal-ui/styles.css";
import {HeroUIProvider} from "@heroui/react";
import Header from "../components/Header";


export default function App({ Component, pageProps }) {
  return (
    <HeroUIProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
      </div>
    </HeroUIProvider>
  )
}
