import { OperationAndChecks } from "./types";

export default async function createFakeOperationAndChecks(): Promise<
  OperationAndChecks[]
> {
  const value = [
    {
      operations: [],
      checks: [
        {
          address: "0xBA485b556399123261a5F9c95d413B4f93107407",
          calldata: "0x77c7b8fc", // getPricePerFullShare
        },
      ],
    },
  ];

  return [value[0]];
}
