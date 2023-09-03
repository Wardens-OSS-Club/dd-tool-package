import { CallInfo, DDCall, DDSequence, EthersContract } from "./types";

export const theContract: EthersContract = {
  functionString:
    "function getPricePerFullShare() external view returns (uint256)",
  address: "0xBA485b556399123261a5F9c95d413B4f93107407",
};

export const theCallInfo: CallInfo = {
  from: "0xBA485b556399123261a5F9c95d413B4f93107407",
};

export const theDDCall: DDCall = {
  contract: theContract,
  callInfo: theCallInfo,
  inputs: [],
};

export function eth(amt: string | number): string {
  return `0x${parseInt(String(amt), 10)}000000000000000000`;
}

const MOCK_STEPS: DDSequence = [
  {
    call: {
      callInfo: {
        value: null,
        gasLimit: null,
        from: "0xBA485b556399123261a5F9c95d413B4f93107407",
      },
      contract: {
        functionString:
          "function getPricePerFullShare() external view returns (uint256)",
        address: "0xBA485b556399123261a5F9c95d413B4f93107407",
      },
      inputs: [], // Input mappings
    },
    outputMappings: ["balance"],
    inputMappings: [],
  },
];
