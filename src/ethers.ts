import { Interface } from "ethers";
import { EthersContract } from "./types";

// Given Ethers representation, returns calldata
export default function encodeCalldata(representation: EthersContract): string {
  const contractInterface = new Interface([representation.functionString]);

  const calldata = contractInterface.encodeFunctionData(
    representation.functionString,
    representation.inputs
  );

  return calldata;
}

// Given arbitrary data response and Ethers representation return the "human readable" result
export function decodeResponse(
  data: string,
  representation: EthersContract
): any {
  const contractInterface = new Interface([representation.functionString]);

  const result = contractInterface.decodeFunctionResult(
    representation.functionString,
    data
  );

  return result;
}
