const web3 = require("@solana/web3.js");
const RPC =
  // "https://mainnet.helius-rpc.com/?api-key=88b41a24-7b42-4213-a8aa-5c1aa7528e4d";
  "https://mainnet.helius-rpc.com/?api-key=bbfc7418-556e-4a26-b4a2-489d9ffdb4be";
// "https://nd-030-584-545.p2pify.com/95b9ffcfbdceda17aa1f5cb870c1c4f2";
// "https://solana-mainnet.core.chainstack.com/704d0c5ae2421c3ecac091544acb5089";
// "https://mainnet.helius-rpc.com/?api-key=88b41a24-7b42-4213-a8aa-5c1aa7528e4d";
export const connection = new web3.Connection(RPC, "confirmed");
