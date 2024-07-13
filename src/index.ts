import { ponder } from "@/generated";
import { type Address, getContractAddress } from "viem";

ponder.on("SafeContract:SafeSetup", async ({ context, event }) => {
  const { SyncSafeChainInstance } = context.db;
  const chain = context.network.chainId;

  await SyncSafeChainInstance.create({
    id: `${event.log.address}-${context.network.chainId}`,
    data: {
      chainId: context.network.chainId,
      address: event.log.address,
      // TODO: Real Safe id (chain id = 0 in create2)
      syncSafeId: "0x",
      deployedAt: event.block.timestamp,
      localOwners: event.args.owners as Address[],
      localThreshold: event.args.threshold,
      creationTxHash: event.transaction.hash,
    },
  });
});

ponder.on("SafeContract:AddedOwner", async ({ context, event }) => {
  const { SyncSafeChainInstance } = context.db;
  await SyncSafeChainInstance.update({
    id: `${event.log.address}-${context.network.chainId}`,
    data: ({ current }) => ({
      localOwners: [...current.localOwners, event.args.owner],
    }),
  });
});

ponder.on("SafeContract:RemovedOwner", async ({ context, event }) => {
  const { SyncSafeChainInstance } = context.db;
  await SyncSafeChainInstance.update({
    id: `${event.log.address}-${context.network.chainId}`,
    data: ({ current }) => ({
      localOwners: current.localOwners.filter(
        (owner) => owner !== event.args.owner,
      ),
    }),
  });
});

ponder.on("SafeContract:ChangedThreshold", async ({ context, event }) => {
  const { SyncSafeChainInstance } = context.db;
  await SyncSafeChainInstance.update({
    id: `${event.log.address}-${context.network.chainId}`,
    data: {
      localThreshold: event.args.threshold,
    },
  });
});

ponder.on("SyncSafeModule:SyncSafeCreated", async ({ context, event }) => {});
