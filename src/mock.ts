import { CallInfo, DDCall, EthersContract } from "./types";

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
