import Ganache, { ServerOptions } from "ganache";
import { OperationAndChecks } from "./types";
import createFakeOperationAndChecks from "./mock";
import execute from "./executor";

// Could be from ENV on test and if not being imported

// No rpc means new ganache without fork
export default async function run(
  operationsAndChecks: OperationAndChecks[],
  rpcUrl?: string
) {
  // FORK
  const options: ServerOptions = {
    fork: {
      url: rpcUrl,
    },
  };
  const server = Ganache.server(options);
  await (async () => {
    const PORT = 0; // 0 means any available port
    server.listen(PORT, async (err) => {
      if (err) throw err;

      console.log(`ganache listening on port ${server.address().port}...`);
      const ganache = server.provider;

      console.log("ganache", ganache);
      console.log("server", server);

      await execute(ganache, operationsAndChecks);
    });
  })();
}
