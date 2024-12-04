import { fetchPurchases } from './client';

export const swrConfig = {
  fetcher: (args) => fetchPurchases(args),
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
//   dedupingInterval: 5000,
};