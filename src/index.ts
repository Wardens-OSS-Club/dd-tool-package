import Ganache, { EthereumProvider, ServerOptions } from "ganache";

// Could be from ENV on test and if not being imported

// React will have a context with the Running Server (and a probe to ensure the server is running)
// Then we'll have a function that does the whole thing and populates data
// And we always revert back to state X

// No rpc means new ganache without fork
export default async function run(
  singleFunction: (ganache: EthereumProvider) => Promise<string>,
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

      console.log("ganache", ganache);
      console.log("server", server);

      // TODO: Here you'd pass the global function expecting a ganache provider
      const res = await singleFunction(ganache);
      console.log("res ults", res);
    });
  })();
}
