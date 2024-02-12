export function checkPositionStatus(
  poolInfo: { tickCurrent: number },
  position: { tickLower: number; tickUpper: number }
) {
  if (position.tickUpper <= poolInfo.tickCurrent)
    return "OutOfRange(PriceIsAboveRange)";
  if (position.tickLower > poolInfo.tickCurrent)
    return "OutOfRange(PriceIsBelowRange)";
  return "InRange";
}
