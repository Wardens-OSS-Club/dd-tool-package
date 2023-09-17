import Ganache, { ServerOptions } from "ganache";
import theGlobalLoop, { parseFileAndRunGlobalLoop } from "./globalLoop";
import { AdditionalSettings, DDSequence } from "./types";

// Could be from ENV on test and if not being imported

// React will have a context with the Running Server (and a probe to ensure the server is running)
// Then we'll have a function that does the whole thing and populates data
// And we always revert back to state X
export default async function run(
  rpcUrl?: string,
  folder?: string,
  fileName?: string
) {
  // FORK
  const options: ServerOptions = rpcUrl
  ? {
      fork: {
        url: rpcUrl,
      },
    }
  : {}; // Nothing if no rpc

  const server = Ganache.provider(options);
  // A single huge function which handles the whole thing
  // Receives ganache and the sequence of functions
  await parseFileAndRunGlobalLoop(server, folder, fileName);
}

export async function runWithoutFile(
  sequence: DDSequence,
  rpcUrl?: string,
  // Global vs Local Ganache Settings so you can fork but, for and, etc...
  settings?: AdditionalSettings 
) {
    // FORK
    const options: ServerOptions = rpcUrl
    ? {
        fork: {
          url: rpcUrl,
        },
      }
    : {}; // Nothing if no rpc
  
  const server = Ganache.provider(options);
  // A single huge function which handles the whole thing
  // Receives ganache and the sequence of functions
  await theGlobalLoop(server, sequence, settings ? settings : { alwaysFundCaller: true })

      
}