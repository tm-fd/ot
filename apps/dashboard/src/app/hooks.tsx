import useSWR from 'swr'

 

  export function usePurchasesData( currentPage ) {
    const { data, error, isLoading, mutate } = useSWR({url: `/purchases`, currentPage});
  
    return {
      data,
      isLoading,
      isError: error,
      mutate,
    }
  }