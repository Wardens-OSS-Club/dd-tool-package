// OLD STUFF
export interface OperationAndChecks {
  operations: Operation[];
  checks: Check[];
}

export interface Operation {
  address: string; // The address to call
  calldata: string; // The calldata to pass, if empty use ""
}

export type CallInfo = Operation;

export interface Check {
  address: string;
  calldata: string;
}

/** NEW SPEC */

// Implies a return value and a way to handle it, as well as a single function which will be called

// == UI == //
export interface EthersContract {
  functionString: string; // Abi Function e.g. "function getRewards() external"
  address: string; // Address of the receiving contract
  inputs: string[]; // variableName[] A list of variables
}

// == INTERNAL == //
export interface ExecutableContract {
  // NOTE: We could add call vs static but I'm pretty sure it won't matter, except maybe for some weird edge case
  calldata: string;
  address: string; //
  value: string; // Value to send
  gasLimit?: string; // If unset we always use as much as possible
}

// A call is always from a from and to a contract
export interface DDCall {
  from: string; // Caller of the call / e.g. the owner, tool must impersonate them
  contract: ExecutableContract;
}

export interface DDStep {
  call: DDCall;
  ouputMappings: {
    [variableName: string]: number; // returnValueIndex || TODO: Can ethers parse back the return value? Else I think long responses will be a mess
  };
}

export type DDSequence = DDStep[];

export interface GlobalState {
  [valueName: string]: [value: any]; // prob a base type for now | Has to be interpreted at assignment || Is passed back to Ethers
}

// Any insertion into GlobalState will be performed by
