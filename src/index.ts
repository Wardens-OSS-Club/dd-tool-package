import theGlobalLoop from "./globalLoop";
import { AdditionalSettings, DDSequence, GlobalState } from "./types";
import startGanache from "./ganache";

export async function runSequence(
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