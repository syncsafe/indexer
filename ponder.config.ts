import { createConfig } from "@ponder/core";
import { http } from "viem";

import {
  arbitrum,
  arbitrumSepolia,
  base,
  baseSepolia,
  linea,
  optimismSepolia,
  sepolia,
} from "viem/chains";
import { SafeABI } from "./abis/SafeABI";
import { SyncSafeABI } from "./abis/SyncSafeABI";
import { SafeProxyFactoryABI } from "./abis/SafeProxyFactory";

export default createConfig({
  networks: {
    linea: {
      chainId: linea.id,
      transport: http(process.env.LINEA_RPC_URL),
      pollingInterval: 4_000
    },
    base: {
      chainId: base.id,
      transport: http(process.env.BASE_RPC_URL),
      pollingInterval: 4_000
    },
    arbitrum: {
      chainId: arbitrum.id,
      transport: http(process.env.ARBITRUM_RPC_URL),
      pollingInterval: 4_000
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
        linea: {
          startBlock: 6774287, // TODO: get starting block from sync
        },
        base: {
          startBlock: 17074252,
        },
        arbitrum: {
          startBlock: 232027583,
        },
      },
    },
    SyncSafeModule: {
      abi: SyncSafeABI,
      address: "0x8991690990Ea0A47B41c67c7Fa82d717387eAcD9",
      network: {
        linea: {
          startBlock: 6774287,
        },
        base: {
          startBlock: 17074252,
        },
        arbitrum: {
          startBlock: 232027583,
        },
      },
    },
  },
});
