import { parseAbi } from "viem";

export const SyncSafeABI = parseAbi([
  "event SyncSafeCreated(address proxy, bytes data)",
]);
