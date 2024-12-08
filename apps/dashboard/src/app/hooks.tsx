import useSWR from 'swr'

 

export function usePurchasesData(params) {
  const { data, error, isLoading, mutate } = useSWR(
    {url: `${process.env.CLOUDRUN_DEV_URL}/purchases/all-purchases`, params},
    {
      revalidateOnFocus: false, // Prevent revalidation on window focus
      dedupingInterval: 0, // Disable deduping
      refreshInterval: 0, // Disable auto-refresh
    }
  );

  return {
    data,
    isLoading,
    isError: error,
    mutate,
  }
}