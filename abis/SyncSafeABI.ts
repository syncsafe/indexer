import { parseAbi } from "viem";

export const SyncSafeABI = parseAbi([
  "struct SafeCreationParams { bytes32 initializerHash; address singleton; uint96 nonce;}",
  "struct SyncSafeParams { bytes32 initBytecodeHash; uint32[] chaindIds; SafeCreationParams creationParams;}",
  "event SyncSafeCreated(address proxyAddress, SyncSafeParams params)",
]);
