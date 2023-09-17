import { EthereumProvider } from "ganache";
import {
  AdditionalSettings,
  DDSequence,
  GlobalState,
  InputMapping,
  OutputMapping,
} from "./types";
import executeOne from "./executor";
import { decodeTxOutput, makeExecutableTx } from "./interpreting";

/// Throws if State is unset
function fromInputMappingsToInputs(
  inputMappings: InputMapping[],
  state: GlobalState
): any[] {
  return inputMappings.map((mapping) => {
    if (mapping.type === "concrete") {
      return mapping.value;
    }

    // Check if it exists or thor
    const valueFromState = state[mapping.value];
    if (!valueFromState) {
      throw Error(
        `Key ${mapping.value} is not defined, please define it or use a concrete value`
      );
    }

    return valueFromState;
  });
}

// Update the State (it's passed by reference)
function updateStateViaOutputMappings(
  output: any[], // Abi Decode Return Value from Contract
  ouputMappings: OutputMapping[],
  state: GlobalState
) {
  if (output.length !== ouputMappings.length) {
    throw Error("Output Length doesn't match Mappings");
  }

  ouputMappings.forEach((mappingKey, variableCount) => {
    // If mapping is empty we skip
    if (!mappingKey) {
      return;
    }

    // If not, we create
    const value = output[variableCount];
    state[mappingKey] = value; // Update State
  });
}

export default async function theGlobalLoop(
  ganache: EthereumProvider,
  sequence: DDSequence,
  // Global vs Local Ganache Settings so you can fork but, for and, etc...
  settings?: AdditionalSettings // TODO: ADD THESE // Maybe on call by call basis, perhaps default with override on a per call basis
): Promise<GlobalState> {
  const STATE: GlobalState = {};

  // While has operations
  let counter = 0;
  while (counter < sequence.length) {
    // Get next op
    const currentOp = sequence[counter];

    // Execute the Call
    // Populate inputs from vars
    const inputs = fromInputMappingsToInputs(currentOp.inputMappings, STATE);

    // Execute
    // NOTE: If it revets it's done
    const response = await executeOne(
      ganache,
      makeExecutableTx(currentOp.call, inputs),
      settings
    );

    // == UPDATE STATE == //
    const ouputDecoded = decodeTxOutput(response, currentOp.call.contract);

    // Update State
    updateStateViaOutputMappings(ouputDecoded, currentOp.outputMappings, STATE);

    // Increase Counter
    counter += 1;
  }

  console.log("STATE", STATE);

  return STATE;
}
