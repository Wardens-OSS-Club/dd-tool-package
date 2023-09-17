import Ganache, { EthereumProvider, ServerOptions } from "ganache";

export default function startGanache(rpcUrl?: string): EthereumProvider {
  // FORK
  const options: ServerOptions = rpcUrl
  ? {
      fork: {
        url: rpcUrl,
      },
    }
  : {}; // Nothing if no rpc

  const server = Ganache.provider(options);

  return server
}