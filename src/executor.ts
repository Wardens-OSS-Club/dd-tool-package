// Runner receives tasks against a state and performs operations

import { EthereumProvider } from "ganache";
import { AdditionalSettings, ExecutableContract } from "./types";
import { eth } from "./mock";

// Function engrave

// import syncWriteFile from "./file";

// Eth_calls to get the return value
// Then executes the TX
// View tx would still happen, no biggie
// Returns the value as bytes
export default async function executeOne(
  ganache: EthereumProvider,
  operationData: ExecutableContract,
  additionalSettings?: AdditionalSettings // TODO: Consider adding the extra settings
): Promise<string> {
  // Account to impersonate

  const caller = operationData.address; // NOTE: They need to have a balance or gg

  // Empty passphrase
  const passphrase = "";

  // We fund the account with an innocent amount
  if (additionalSettings?.fundsToCaller) {
    // @ts-ignore because obviously
    await ganache.send("evm_setAccountBalance", [
      caller,
      additionalSettings?.fundsToCaller,
    ]);
  } else if (additionalSettings?.alwaysFundCaller) {
    // @ts-ignore because obviously
    await ganache.send("evm_setAccountBalance", [caller, eth(10)]);
  }

  // Adds the account
  // @ts-ignore because obviously
  await ganache.send("evm_addAccount", [caller, passphrase]);

  // Unlocks it so you can use it
  // @ts-ignore because obviously
  await ganache.send("personal_unlockAccount", [caller, passphrase]);

  const txData = {
    from: caller,
    to: operationData.address,
    data: operationData.calldata,
    value: operationData.callInfo.value ? operationData.callInfo.value : "0x0",
  };

  console.log("txData", txData);

  // Use ganache to perform the tx

  // Get th return value first
  // @ts-ignore because obviously
  const viewRes = await ganache.send("eth_call", [txData]);
  console.log("viewRes", viewRes);

  // To run the TX
  // @ts-ignore because obviously
  await ganache.send("eth_sendTransaction", [txData]);

  return viewRes; // Return value
}
