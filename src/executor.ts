// Runner receives tasks against a state and performs operations

import { Provider } from "ganache";
import { OperationAndChecks } from "./types";
// import syncWriteFile from "./file";

// Run values against forked state, always go back to prev state
export default async function execute(
  ganache: Provider,
  values: OperationAndChecks[]
) {
  // Take snapshot
  // Ignore because it works but types are not updated or something
  // @ts-ignore
  const snapshotId = await ganache.send("evm_snapshot");

  // TODO: run the set of checks
  console.log("Running checks");

  for (const value of values) {
    console.log("Operations");
    for (const operation of value.operations) {
      console.log("operation"); // TODO
    }

    for (const check of value.checks) {
      // Account to impersonate
      const caller = "0x4a0126Ee88018393b1AD2455060Bc350eAd9908A";

      // Empty passphrase
      const passphrase = "";

      // Adds the account
      // @ts-ignore
      await ganache.send("evm_addAccount", [caller, passphrase]);

      // Unlocks it so you can use it
      // @ts-ignore
      await ganache.send("personal_unlockAccount", [caller, passphrase]);

      // Use ganache to perform the tx
      // @ts-ignore because obviously
      const viewRes = await ganache.send("eth_call", [
        {
          from: caller,
          to: check.address,
          data: check.calldata,
          value: 0,
        },
      ]);

      console.log("viewRes", viewRes);

      // Todo given ABI decode the response (prob not at the runner level but at the "interpreter level")
      // I'm pretty sure runner can feed bytes to bytes and ignore all types since EVM has words so interpretation of a chain of inputs is straightforward
      // Unless some chains require human ops // Prob the case for uint64 -> uint256 in nice UI -> uint64 in input, which could cause the u64 to be too big for the next call
    }

    // Ignore because it works but types are not updated or something
    // @ts-ignore
    const isReverted = await ganache.send("evm_revert", [snapshotId]);
  }
}
