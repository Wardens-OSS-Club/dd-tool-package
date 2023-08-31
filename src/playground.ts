import run from ".";
import encodeCall, { decodeResponse } from "./ethers";
import executeOne from "./executor";
import {
  EthersContract,
  ExecutableContract,
  OperationAndChecks,
} from "./types";

const RPC_URL = "https://mainnet.infura.io/v3/c7663ea6ddf54fdbaa673941846b176c";

const theContract: EthersContract = {
  functionString:
    "function getPricePerFullShare() external view returns (uint256)",
  address: "0xBA485b556399123261a5F9c95d413B4f93107407",
  inputs: [],
};

// Call info
// value
// gas limit
// from

// Given Etherslike Inputs, generate the Executable Data
function makeExecutableTx(theContractCall: EthersContract): ExecutableContract {
  const theCalldata = encodeCall(theContractCall);
  return {
    calldata: theCalldata,
    address: theContractCall.address,
    value: theContractCall.value,
    gasLimit: theContractCall.gasLimit,
  };
}

function decodeTxOutput(data: string, theContractCall: EthersContract): any {
  const res = decodeResponse(data, theContractCall);
  return res;
}

run(async (ganache) => {
  const response = await executeOne(ganache, makeExecutableTx(theContract));

  return decodeTxOutput(response, theContract);
}, RPC_URL);
// export interface ExecutableContract {
//   // NOTE: We could add call vs static but I'm pretty sure it won't matter, except maybe for some weird edge case
//   calldata: string;
//   address: string; //
//   value: string; // Value to send
//   gasLimit?: string; // If unset we always use as much as possible
// }
