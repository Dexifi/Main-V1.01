# Dexifi

A multi-protocol DeFi terminal for Solana. It aggregates a wallet's positions
across protocols into a single dashboard, and provides swap, lending,
liquidity, and order book interfaces.

Next.js 13 (App Router) frontend. All protocol interaction is client-side
through the connected wallet; there is no backend in this repository.

## Integrations

- **Jupiter** — swap quoting and execution; limit orders
- **Solend** — supply, borrow, withdraw, repay; obligation and reserve data
- **Raydium** — AMM and CLMM positions, farms, staking
- **OpenBook** — order book, open orders, order placement and settlement
- **Metaplex** — NFT lookup by owner
- **Bonfida** — SNS domain resolution

## Stack

Next.js 13, React 18, TypeScript, Tailwind CSS with Radix UI, Zustand and
Jotai for state, Recharts, `@solana/web3.js` and `@solana/wallet-adapter`.

## Setup

Requires Node.js 16.14 or newer.

```bash
yarn install
cp .env.example .env
```

Fill in the values in `.env`. `NEXT_PUBLIC_REACT_APP_NETWORK` selects the
cluster; at least one of `NEXT_PUBLIC_RPC_1` or `NEXT_PUBLIC_RPC_2` must be
set, as the first populated entry becomes the default connection.

```bash
yarn dev
```

Runs at http://localhost:3000.

Other scripts: `yarn build`, `yarn start`, `yarn lint`.
