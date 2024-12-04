import { fetchPurchases } from './client';

export const swrConfig = {
  fetcher: (args) => fetchPurchases(args),
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  dedupingInterval: 5000,
};