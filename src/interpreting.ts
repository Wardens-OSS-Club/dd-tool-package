// From Json to Executable

import encodeCalldata, { decodeResponse } from "./ethers";
import { DDCall, EthersContract, ExecutableContract } from "./types";

// From
// TODO: ADD STATE
// STATE needs to be used for additional inputs if not provided
export function makeExecutableTx(
  theCallDetails: DDCall,
  inputs: string[]
): ExecutableContract {
  const theCalldata = encodeCalldata(theCallDetails.contract, inputs);
  return {
    calldata: theCalldata, // Encoded Calldata
    address: theCallDetails.contract.address, // Address
    callInfo: theCallDetails.callInfo, // Info
  };
}

// From Raw Bytes to Ethers to Value
// Used for Variable Population
export function decodeTxOutput(
  data: string,
  theContractCall: EthersContract
): any {
  const res = decodeResponse(data, theContractCall);
  return res;
}
