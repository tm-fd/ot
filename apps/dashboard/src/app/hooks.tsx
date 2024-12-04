import useSWR from 'swr'

 

  export function usePurchasesData( params ) {
    const { data, error, isLoading, mutate } = useSWR({url: `${process.env.CLOUDRUN_DEV_URL}/purchases/all-purchases`, params});
  
    return {
      data,
      isLoading,
      isError: error,
      mutate,
    }
  }