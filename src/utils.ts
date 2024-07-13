import {
  type Address,
  type Hex,
  encodePacked,
  getContractAddress,
  keccak256,
} from "viem";

export function getSafeAddress(
  initBytecodeHash: Hex,
  initializerHash: Hex,
  nonce: bigint,
  chaindId: number,
  factory: Address,
) {
  const salt = keccak256(
    encodePacked(
      ["bytes32", "bytes32"],
      [
        initializerHash,
        keccak256(encodePacked(["uint", "uint32"], [nonce, chaindId])),
      ],
    ),
  );
  return getContractAddress({
    opcode: "CREATE2",
    salt,
    bytecodeHash: initBytecodeHash,
    from: factory,
  });
}
