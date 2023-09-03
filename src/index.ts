import Ganache, { ServerOptions } from "ganache";
import { parseFileAndRunGlobalLoop } from "./globalLoop";

// Could be from ENV on test and if not being imported

// React will have a context with the Running Server (and a probe to ensure the server is running)
// Then we'll have a function that does the whole thing and populates data
// And we always revert back to state X

// No rpc means new ganache without fork
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

  const server = Ganache.server(options);
  (async () => {
    const PORT = 0; // 0 means any available port
    server.listen(PORT, async (err) => {
      if (err) throw err;

      console.log(`ganache listening on port ${server.address().port}...`);
      const ganache = server.provider;

      // TODO: Here you'd pass the global function expecting a ganache provider

      // TODO: Expect issues with snapshotting
      // We prob need to have a snapshot -> Execute setup if server doesn't stop

      // A single huge function which handles the whole thing
      // Receives ganache and the sequence of functions
      await parseFileAndRunGlobalLoop(ganache, folder, fileName);
    });
  })();
}

// Function that receives ganache
// Function that reads the instructions
// Global Variables

// Each iteration of the fn

const RPC_URL = "https://mainnet.infura.io/v3/c7663ea6ddf54fdbaa673941846b176c";

run(RPC_URL, "task", "steps.json");
