import { EthereumProvider } from "ganache";
import { openFile } from "./file";
import { DDSequence, GlobalState } from "./types";
import theGlobalLoop from "./globalLoop";
import startGanache from "./ganache";

function getStepsFromFile(folder: string, name: string): DDSequence {
  const data = JSON.parse(openFile(folder, name));

  const { sequence } = data;

  // TODO: https://stackoverflow.com/questions/62854637/how-to-check-type-of-a-json-object-against-typescript-interface-in-react
  // You'd need to write some BS validator
  // We could also just apply safe defaults for most common mistakes

  return sequence as DDSequence;
}

// Outer FN needs to parse keys, run op, return state and return keys so it's convenient
export async function parseFileAndRunGlobalLoop(
  ganache: EthereumProvider,
  folder: string,
  name: string
): Promise<GlobalState> {
  // Read from file:
  // TODO: Internal Loop with Data Read from File
  // We return State
  // File Name prob via .env
  const steps = getStepsFromFile(folder, name);

  // NOTE: Safe default of always sending ETH
  const endState = await theGlobalLoop(ganache, steps, { alwaysFundCaller: true });
  return endState
}

// React will have a context with the Running Server (and a probe to ensure the server is running)
// Then we'll have a function that does the whole thing and populates data
// And we always revert back to state X
export default async function runFromFile(
  rpcUrl?: string,
  folder?: string,
  fileName?: string
): Promise<GlobalState> {
  const server = startGanache(rpcUrl)

  // A single huge function which handles the whole thing
  // Receives ganache and the sequence of functions
  const state = await parseFileAndRunGlobalLoop(server, folder, fileName);

  return state
}