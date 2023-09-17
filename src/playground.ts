import runFromFile from "./runFromFile";

const RPC_URL = "https://mainnet.infura.io/v3/c7663ea6ddf54fdbaa673941846b176c";

runFromFile(RPC_URL, "task", "steps.json");
