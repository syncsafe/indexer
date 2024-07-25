import {
  type Address,
  type Hex,
  encodePacked,
  getContractAddress,
  keccak256,
} from "viem";
import { arbitrum, base, linea } from "viem/chains";

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

export function fromEidToChainId(eid: number): number {
  switch (eid) {
    case 30110:
      return arbitrum.id;
    case 30184:
      return base.id;
    case 30183:
      return linea.id;
    default:
      return 0;
  }
}
