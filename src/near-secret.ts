import { create, open } from '@nearfoundation/near-js-encryption-box';
import {utils} from "near-api-js";

export class NearSecret {
    constructor(
        protected userKeyPair: utils.key_pair.KeyPairEd25519,
        protected chatKeyPair: utils.key_pair.KeyPairEd25519,
        protected opponentPublicKey: string,
    ) {}

    public encode(text: string) {
        // Encrypting a message
        const chatPublicKey = this.chatKeyPair.getPublicKey().toString();
        const privateKeyAlice = this.userKeyPair.secretKey;
        const { secret, nonce } = this.encodeRaw(text, chatPublicKey, privateKeyAlice); // you can also pass your own custom nonce as a 4th parameter

        return {
            secret, nonce,
        }
    }

    public decode(secret: string, nonce: string) {
        // Decrypting the message
        const publicKeyAlice = this.opponentPublicKey;
        const chatSecretKey = this.chatKeyPair.secretKey;
        const messageReceived = this.decodeRaw(secret, nonce, publicKeyAlice, chatSecretKey);

        return messageReceived;
    }

    public encodeRaw(text: string, publicKey: string, privateKey: string) {
        return create(text, publicKey, privateKey); // you can also pass your own custom nonce as a 4th parameter
    }

    public decodeRaw(secret: string, nonce: string, publicKey: string, privateKey: string) {
        return open(secret, publicKey, privateKey, nonce);
    }
}
