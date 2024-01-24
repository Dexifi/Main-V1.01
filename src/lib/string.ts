const formatedString = (x: string) => x.split(" ").join("_");
export const removeMiddleString = (x: string) =>
  `${x.slice(0, 4)}...${x.slice(-4)}`;

export default formatedString;
