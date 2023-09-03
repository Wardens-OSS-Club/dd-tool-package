import run from ".";
import executeOne from "./executor";
import { decodeTxOutput, makeExecutableTx } from "./interpreting";
import { theContract, theDDCall } from "./mock";

const RPC_URL = "https://mainnet.infura.io/v3/c7663ea6ddf54fdbaa673941846b176c";

// Call info
// value
// gas limit
// from

// run(async (ganache) => {
//   const response = await executeOne(ganache, makeExecutableTx(theDDCall));

//   return decodeTxOutput(response, theContract);
// }, RPC_URL);
