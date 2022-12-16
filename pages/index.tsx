import Head from "next/head";
import React from "react";
import {useNearUser} from "react-near";
import {NearSecret} from "../src/near-secret";
import {utils} from "near-api-js";

export default function Home() {
    const user = useNearUser();

    (async () => {
        const keyPairAlice = utils.key_pair.KeyPairEd25519.fromRandom();
        const keyPairBob = utils.key_pair.KeyPairEd25519.fromRandom();
        const keyPairChat = utils.key_pair.KeyPairEd25519.fromRandom();

        const alicaNearSecret = new NearSecret(keyPairAlice, keyPairChat, keyPairBob.publicKey.toString());
        const bobNearSecret = new NearSecret(keyPairBob, keyPairChat, keyPairAlice.publicKey.toString());

        // на запись нужно иметь публичный ключ чата
        // на чтение нужно иметь публичный ключ оппонента и секрет-ключ чата

        const aliceMessageEncoded = alicaNearSecret.encode('Hello Bob');
        const bobDecodeAliceMessage = bobNearSecret.decode(aliceMessageEncoded.secret, aliceMessageEncoded.nonce);
        console.log('Alice message: ', bobDecodeAliceMessage);

        const bobMessageEncoded = bobNearSecret.encode('Hi Alice');
        const aliceDecodeBobMessage = alicaNearSecret.decode(bobMessageEncoded.secret, bobMessageEncoded.nonce);
        console.log('Bob message: ', aliceDecodeBobMessage);
    })()

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
          {!user.isConnected && <button onClick={() => user.connect()}>connect</button>}
          {user.isConnected && <div>test</div>}
      </main>
    </div>
  );
}
