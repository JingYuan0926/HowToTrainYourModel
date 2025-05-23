import "../styles/globals.css";
import "@near-wallet-selector/modal-ui/styles.css";
import {HeroUIProvider} from "@heroui/react";

export default function App({ Component, pageProps }) {
  return (
    <HeroUIProvider>
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow flex justify-center w-full">
          <Component {...pageProps} />
        </main>
      </div>
    </HeroUIProvider>
  )
}
