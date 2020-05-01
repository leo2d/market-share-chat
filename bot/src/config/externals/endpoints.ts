import { STOOQ_API_BASE_URL } from '../config';

export const getStooqEndPoint = (stockCode: string): string => {
  return `${STOOQ_API_BASE_URL}/q/l/?s=${stockCode}&f=sd2t2ohlcv&h&e=csv`;
};
