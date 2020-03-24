export const getStooqEndPoint = (stockCode: string): string => {
  return `https://stooq.com/q/l/?s=${stockCode}&f=sd2t2ohlcv&h&e=csv`;
};
