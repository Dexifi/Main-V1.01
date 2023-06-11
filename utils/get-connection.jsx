const web3 = require("@solana/web3.js");
const RPC = "https://nd-030-584-545.p2pify.com/95b9ffcfbdceda17aa1f5cb870c1c4f2";
export const connection = new web3.Connection(RPC, "confirmed");
