import * as web3 from "@solana/web3.js";
// Manually initialize variables that are automatically defined in Playground
const PROGRAM_ID = new web3.PublicKey("ChMzS4QEMSu8BJExrS5p5VkWSSvJB9PrnX2tTsKXnKs8");
const connection = new web3.Connection("https://api.devnet.solana.com", "confirmed");
const wallet = { keypair: web3.Keypair.generate() };

// Client
console.log("My address:", wallet.keypair.publicKey.toString());
const balance = await connection.getBalance(wallet.keypair.publicKey);
console.log(`My balance: ${balance / web3.LAMPORTS_PER_SOL} SOL`);
