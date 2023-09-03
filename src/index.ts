import Ganache, { EthereumProvider, ServerOptions } from "ganache";
import { DDSequence, GlobalState, InputMapping, OutputMapping } from "./types";
import executeOne from "./executor";
import { decodeTxOutput, makeExecutableTx } from "./interpreting";
import { theContract, theDDCall } from "./mock";

// Could be from ENV on test and if not being imported

// React will have a context with the Running Server (and a probe to ensure the server is running)
// Then we'll have a function that does the whole thing and populates data
// And we always revert back to state X

// No rpc means new ganache without fork
export default async function run(
  // singleFunction: (ganache: EthereumProvider) => Promise<string>,
  rpcUrl?: string
) {
  // FORK
  const options: ServerOptions = rpcUrl
    ? {
        fork: {
          url: rpcUrl,
        },
      }
    : {}; // Nothing if no rpc

  const server = Ganache.server(options);
  await (async () => {
    const PORT = 0; // 0 means any available port
    server.listen(PORT, async (err) => {
      if (err) throw err;

      console.log(`ganache listening on port ${server.address().port}...`);
      const ganache = server.provider;

      // TODO: Here you'd pass the global function expecting a ganache provider

      // A single huge function which handles the whole thing
      // Receives ganache and the sequence of functions
      await parseFileAndRunGlobalLoop(ganache);
    });
  })();
}

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

// Function that receives ganache
// Function that reads the instructions
// Global Variables

// Each iteration of the fn

// Outer FN needs to parse keys, run op, return state and return keys so it's convenient
async function parseFileAndRunGlobalLoop(
  ganache: EthereumProvider
): Promise<void> {
  // Read from file:
  // TODO: Internal Loop with Data Read from File
  // We return State

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

  await theGlobalLoop(ganache, MOCK_STEPS);
}

async function theGlobalLoop(
  ganache: EthereumProvider,
  sequence: DDSequence,
  // Global vs Local Ganache Settings so you can fork but, for and, etc...
  settings?: any // TODO: ADD THESE // Maybe on call by call basis, perhaps default with override on a per call basis
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
    const response = await executeOne(
      ganache,
      makeExecutableTx(currentOp.call, inputs)
    );

    // == UPDATE STATE == //
    const ouputDecoded = decodeTxOutput(response, theContract);

    // Update State
    updateStateViaOutputMappings(ouputDecoded, currentOp.outputMappings, STATE);

    // Increase Counter
    counter += 1;
  }

  console.log("STATE", STATE);

  return STATE;
}

const RPC_URL = "https://mainnet.infura.io/v3/c7663ea6ddf54fdbaa673941846b176c";

run(RPC_URL);
