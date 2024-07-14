import { parseAbi } from "viem";

export const SyncSafeABI = parseAbi([
  "struct SafeCreationParams { bytes32 initializerHash; address singleton; uint96 nonce;}",
  "struct SyncSafeParams { bytes32 initBytecodeHash; uint32[] chaindIds; SafeCreationParams creationParams;}",
  "event SyncSafeCreated(address proxyAddress, SyncSafeParams params)",
  "event EmitNewState(address topLevel, address[] owners, uint256 threshold)",
  "function proxyCreationParams(address proxy) public view returns (SafeCreationParams memory)",
  "function getAddressOnEid(SafeCreationParams memory params, uint32 eid) public view returns (address addr)",
]);
