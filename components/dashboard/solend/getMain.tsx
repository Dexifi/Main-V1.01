// import React, { useEffect, useState } from "react";
// import {
//   SolendMarket,
//   Obligation,
//   SolendReserve,
// } from "@solendprotocol/solend-sdk";
// import { PublicKey } from "@solana/web3.js";
// import { useWallet } from "@solana/wallet-adapter-react";
// import styles from "../../../pages/dashboard.module.css";
// import { connection } from "../../../utils/get-connection";

// const GetMainMarket = ({ lendValue, setLendValue }) => {
//   const { publicKey } = useWallet();
//   const [isLoading, setIsLoading] = useState(true);
//   const [main, setMain] = useState();
//   const fetchData = async () => {
//     if (!publicKey) return;
//     try {
//       const mainMarket = await SolendMarket.initialize(
//         connection,
//         "production"
//       );
//       await mainMarket.loadAll();
//       await mainMarket.loadReserves();
//       const result = await mainMarket.fetchObligationByWallet(publicKey);
//       if (!result) return setIsLoading(false);
//       let newSum = 0;
//       Promise.all([
//         Promise.all(
//           result.deposits.map(async (i) => {
//             const token = mainMarket.reserves.find(
//               (token) => token.config.liquidityToken.mint === i.mintAddress
//             );
//             await token?.load();
//             i.token = token;
//             i.value =
//               i.amount.toNumber() / 10 ** token?.config.liquidityToken.decimals;
//             i.valueUSD = token?.stats?.assetPriceUSD * i.value;
//             i.APR = token?.stats?.supplyInterestAPY
//               ? ((1 + token.stats?.supplyInterestAPY / 1) ** 1 - 1) * 100
//               : null;
//             return i.valueUSD;
//           })
//         ),
//         Promise.all(
//           result.borrows.map(async (i) => {
//             const token = mainMarket.reserves.find(
//               (token) => token.config.liquidityToken.mint === i.mintAddress
//             );
//             i.token = token;
//             i.value =
//               i.amount.toNumber() / 10 ** token?.config.liquidityToken.decimals;
//             i.valueUSD = token?.stats?.assetPriceUSD * i.value;
//             i.APR = token?.stats?.borrowInterestAPY
//               ? ((1 + token.stats?.borrowInterestAPY / 1) ** 1 - 1) * 100
//               : null;
//             return i.valueUSD;
//           })
//         ),
//       ]).then(([depositValues, borrowValues]) => {
//         const newSum = depositValues
//           .concat(borrowValues)
//           .reduce((a, b) => a + b, 0);
//         setMain(result);
//         setLendValue((prevLendValue) => prevLendValue + newSum);
//       });
//       setIsLoading(false); // تغییر مقدار isLoading به false بعد از دریافت داده‌ها
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   useEffect(() => {
//     setIsLoading(true);
//     if (isLoading) fetchData();
//   }, [publicKey]);
//   return (
//     <>
//       {isLoading ? (
//         <div className={styles.solParent}>Loading...</div>
//       ) : (
//         <div>
//           {main?.deposits.map((item, index) => (
//             <div key={index}>
//               <div className={styles.div19}>
//                 <div className={styles.atlas}>
//                   {item.token.config.liquidityToken.symbol}
//                 </div>
//                 <div className={styles.solend}>Solend</div>
//                 <div className={styles.turboSol}>Main Pool</div>
//                 <div className={styles.div20}>
//                   {item.valueUSD.toFixed(2)} ({item.APR.toFixed(2)}%)
//                 </div>
//                 <img
//                   className={styles.solanaCopy23}
//                   alt=""
//                   src={item.token.config.liquidityToken.logo}
//                 />
//                 <img
//                   className={styles.image1Icon}
//                   alt=""
//                   src="/image-1@2x.png"
//                 />
//                 <div className={styles.m}>$ 17.0 m</div>
//                 <div className={styles.div21}>0</div>
//                 <div className={styles.div22}>60.01 %</div>
//                 <div className={styles.inner} />
//               </div>
//             </div>
//           ))}
//           {main?.borrows.map((item, index) => (
//             <div key={index}>
//               <div className={styles.div19}>
//                 <div className={styles.atlas}>
//                   {item.token.config.liquidityToken.symbol}
//                 </div>
//                 <div className={styles.solend}>Solend</div>
//                 <div className={styles.turboSol}>Main Pool</div>
//                 <div className={styles.div20}>0</div>
//                 <img
//                   className={styles.solanaCopy23}
//                   alt=""
//                   src={item.token.config.liquidityToken.logo}
//                 />
//                 <img
//                   className={styles.image1Icon}
//                   alt=""
//                   src="/image-1@2x.png"
//                 />
//                 <div className={styles.m}>$ 17.0 m</div>
//                 <div className={styles.div21}>
//                   {item.valueUSD.toFixed(2)}({item.APR.toFixed(2)})
//                 </div>
//                 <div className={styles.div22}>60.01 %</div>
//                 <div className={styles.inner} />
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </>
//   );
// };
export {}
// export default GetMainMarket;
// TODO not used