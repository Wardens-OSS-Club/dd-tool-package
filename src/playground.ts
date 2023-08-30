import run from ".";
import encodeCall from "./ethers";
import { EthersContract, OperationAndChecks } from "./types";

const RPC_URL = "https://mainnet.infura.io/v3/c7663ea6ddf54fdbaa673941846b176c";

const theContract: EthersContract = {
  functionString:
    "function getPricePerFullShare() external view returns (uint256)",
  address: "0xBA485b556399123261a5F9c95d413B4f93107407",
  inputs: [],
};
const theCalldata = encodeCall(theContract);

const asChecksAndOperations: OperationAndChecks[] = [
  {
    operations: [],
    checks: [
      {
        address: theContract.address,
        calldata: theCalldata,
      },
    ],
  },
];

run(asChecksAndOperations, RPC_URL);
