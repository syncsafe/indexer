import { createSchema } from "@ponder/core";

export default createSchema((p) => ({
  SyncSafe: p.createTable({
    id: p.hex(),
    originChain: p.int(),
    chainsSafe: p.many("SyncSafeChainInstance.syncSafeId"),
    chains: p.int().list(),
    owners: p.hex().list(),
    threshold: p.bigint(),
    creationTxHash: p.hex(),
  }),
  SyncSafeChainInstance: p.createTable({
    id: p.string(),
    address: p.hex(),
    syncSafeId: p.hex().references("SyncSafe.id").optional(),
    deployedAt: p.bigint(),
    localOwners: p.hex().list(),
    localThreshold: p.bigint(),
    creationTxHash: p.hex(),
    chainId: p.int(),
  }),
}));
