import type { AppProps } from 'next/app'
import {NearProvider} from "react-near";

export default function App({ Component, pageProps }: AppProps) {
  return <NearProvider authContractId='mfight-nft_v2.testnet'>
    <Component {...pageProps} />
  </NearProvider>
}
