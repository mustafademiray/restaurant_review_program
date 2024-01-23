import * as borsh from "borsh";
import assert from "assert";
import * as web3 from "@solana/web3.js";
// Manually initialize variables that are automatically defined in Playground
const PROGRAM_ID = new web3.PublicKey("ChMzS4QEMSu8BJExrS5p5VkWSSvJB9PrnX2tTsKXnKs8");
const connection = new web3.Connection("https://api.devnet.solana.com", "confirmed");
const wallet = { keypair: web3.Keypair.generate() };


/**
 * The state of a greeting account managed by the hello world program
 */
class GreetingAccount {
  counter = 0;
  constructor(fields: { counter: number } | undefined = undefined) {
    if (fields) {
      this.counter = fields.counter;
    }
  }
}

/**
 * Borsh schema definition for greeting accounts
 */
const GreetingSchema = new Map([
  [GreetingAccount, { kind: "struct", fields: [["counter", "u32"]] }],
]);

/**
 * The expected size of each greeting account.
 */
const GREETING_SIZE = borsh.serialize(
  GreetingSchema,
  new GreetingAccount()
).length;

describe("Test", () => {
  it("greet", async () => {
    // Create greetings account instruction
    const greetingAccountKp = new web3.Keypair();
    const lamports = await connection.getMinimumBalanceForRentExemption(
      GREETING_SIZE
    );
    const createGreetingAccountIx = web3.SystemProgram.createAccount({
      fromPubkey: wallet.keypair.publicKey,
      lamports,
      newAccountPubkey: greetingAccountKp.publicKey,
      programId: PROGRAM_ID,
      space: GREETING_SIZE,
    });

    // Create greet instruction
    const greetIx = new web3.TransactionInstruction({
      keys: [
        {
          pubkey: greetingAccountKp.publicKey,
          isSigner: false,
          isWritable: true,
        },
      ],
      programId: PROGRAM_ID,
    });

    // Create transaction and add the instructions
    const tx = new web3.Transaction();
    tx.add(createGreetingAccountIx, greetIx);

    // Send and confirm the transaction
    const txHash = await web3.sendAndConfirmTransaction(connection, tx, [
      wallet.keypair,
      greetingAccountKp,
    ]);
    console.log(`Use 'solana confirm -v ${txHash}' to see the logs`);

    // Fetch the greetings account
    const greetingAccount = await connection.getAccountInfo(
      greetingAccountKp.publicKey
    );

    // Deserialize the account data
    const deserializedAccountData = borsh.deserialize(
      GreetingSchema,
      GreetingAccount,
      greetingAccount.data
    );

    // Assertions
    assert.equal(greetingAccount.lamports, lamports);
    assert(greetingAccount.owner.equals(PROGRAM_ID));
    assert.deepEqual(greetingAccount.data, Buffer.from([1, 0, 0, 0]));
    assert.equal(deserializedAccountData.counter, 1);
  });
});
