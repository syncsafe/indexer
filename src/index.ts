import { ponder } from "@/generated";
import {
  type Address,
  encodePacked,
  getContractAddress,
  keccak256,
} from "viem";
import { fromEidToChainId, getSafeAddress } from "./utils";
import { SafeProxyFactoryABI } from "../abis/SafeProxyFactory";

const proxyFactoryAddress = "0xa6B71E26C5e0845f74c812102Ca7114b6a896AB2";

ponder.on("SafeContract:SafeSetup", async ({ context, event }) => {
  const { SyncSafeChainInstance } = context.db;
  const chain = context.network.chainId;

  // const address = getSafeAddress(initBytecodeHash, keccak256(event.args.initializer), event.args., chaindId, factory)
  await SyncSafeChainInstance.create({
    id: `${event.log.address}-${context.network.chainId}`,
    data: {
      chainId: context.network.chainId,
      address: event.log.address,
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

ponder.on("SyncSafeModule:SyncSafeCreated", async ({ context, event }) => {
  const { SyncSafe, SyncSafeChainInstance } = context.db;

  const bytecode = await context.client.readContract({
    address: proxyFactoryAddress,
    abi: SafeProxyFactoryABI,
    functionName: "proxyCreationCode",
  });

  const initBytecodeHash = keccak256(
    encodePacked(
      ["bytes", "address"],
      [bytecode, event.args.params.creationParams.singleton],
    ),
  );

  const address = getSafeAddress(
    initBytecodeHash,
    event.args.params.creationParams.initializerHash,
    event.args.params.creationParams.nonce,
    0,
    proxyFactoryAddress,
  );

  const instance = await SyncSafeChainInstance.update({
    id: `${event.args.proxyAddress}-${context.network.chainId}`,
    data: {
      syncSafeId: address,
    },
  });

  await SyncSafe.upsert({
    id: address,
    update: {},
    create: {
      threshold: instance.localThreshold,
      owners: instance.localOwners,
      originChain: context.network.chainId,
      chains: [
        ...event.args.params.chaindIds.map((eid) => fromEidToChainId(eid)),
        context.network.chainId,
      ],
      creationTxHash: event.transaction.hash,
    },
  });
});
