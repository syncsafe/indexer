import { createConfig } from "@ponder/core";
import { http } from "viem";

import { arbitrumSepolia, optimismSepolia, sepolia } from "viem/chains";
import { SafeABI } from "./abis/SafeABI";
import { SyncSafeABI } from "./abis/SyncSafeABI";
import { SafeProxyFactoryABI } from "./abis/SafeProxyFactory";

export default createConfig({
  networks: {
    sepolia: {
      chainId: sepolia.id,
      transport: http(sepolia.rpcUrls.default.http[0]),
    },
    arbitrumSepolia: {
      chainId: arbitrumSepolia.id,
      transport: http(arbitrumSepolia.rpcUrls.default.http[0]),
    },
    optimismSepolia: {
      chainId: optimismSepolia.id,
      transport: http(optimismSepolia.rpcUrls.default.http[0]),
    },
  },
  contracts: {
    SafeContract: {
      abi: SafeABI,
      factory: {
        address: "0x",
        event: SafeProxyFactoryABI[0],
        parameter: "proxy",
      },
      network: {
        sepolia: {
          startBlock: 0,
        },
        arbitrumSepolia: {
          startBlock: 0,
        },
        optimismSepolia: {
          startBlock: 0,
        },
      },
    },
    SyncSafeModule: {
      abi: SyncSafeABI,
      address: "0x",
      network: {
        sepolia: {
          startBlock: 0,
        },
        arbitrumSepolia: {
          startBlock: 0,
        },
        optimismSepolia: {
          startBlock: 0,
        },
      },
    },
  },
});
