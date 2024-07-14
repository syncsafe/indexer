import { createConfig } from "@ponder/core";
import { http } from "viem";

import {
  arbitrumSepolia,
  baseSepolia,
  optimismSepolia,
  sepolia,
} from "viem/chains";
import { SafeABI } from "./abis/SafeABI";
import { SyncSafeABI } from "./abis/SyncSafeABI";
import { SafeProxyFactoryABI } from "./abis/SafeProxyFactory";

export default createConfig({
  networks: {
    sepolia: {
      chainId: sepolia.id,
      transport: http(process.env.SEPOLIA_RPC_URL),
    },
    baseSepolia: {
      chainId: baseSepolia.id,
      transport: http(process.env.BASE_SEPOLIA_RPC_URL),
    },
    arbitrumSepolia: {
      chainId: arbitrumSepolia.id,
      transport: http(process.env.ARBITRUM_SEPOLIA_RPC_URL),
    },
  },
  contracts: {
    SafeContract: {
      abi: SafeABI,
      factory: {
        address: "0xa6B71E26C5e0845f74c812102Ca7114b6a896AB2",
        event: SafeProxyFactoryABI[0],
        parameter: "proxy",
      },
      network: {
        sepolia: {
          startBlock: 6306358,
        },
        baseSepolia: {
          startBlock: 12578150,
        },
        arbitrumSepolia: {
          startBlock: 63695847,
        },
      },
    },
    SyncSafeModule: {
      abi: SyncSafeABI,
      address: "0x48a50E6FD14Aa262FB250Be5D5f182f538516401",
      network: {
        sepolia: {
          startBlock: 6306358,
        },
        baseSepolia: {
          startBlock: 12578150,
        },
        arbitrumSepolia: {
          startBlock: 63695847,
        },
      },
    },
  },
});
