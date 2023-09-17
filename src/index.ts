import Ganache, { ServerOptions } from "ganache";
import theGlobalLoop, { parseFileAndRunGlobalLoop } from "./globalLoop";
import { AdditionalSettings, DDSequence, GlobalState } from "./types";
import startGanache from "./ganache";

// Could be from ENV on test and if not being imported

// React will have a context with the Running Server (and a probe to ensure the server is running)
// Then we'll have a function that does the whole thing and populates data
// And we always revert back to state X
export default async function run(
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

export async function runWithoutFile(
  sequence: DDSequence,
  rpcUrl?: string,
  // Global vs Local Ganache Settings so you can fork but, for and, etc...
  settings?: AdditionalSettings 
): Promise<GlobalState> {
  const server = startGanache(rpcUrl)
  
  // A single huge function which handles the whole thing
  // Receives ganache and the sequence of functions
  const state = await theGlobalLoop(server, sequence, settings ? settings : { alwaysFundCaller: true })

  return state
}