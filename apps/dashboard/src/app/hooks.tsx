import useSWR from 'swr'
import { PurchaseObj } from './store/zustandStore';

 

export function usePurchasesData(params) {
  const { data, error, isLoading, mutate } = useSWR(
    {url: `${process.env.CLOUDRUN_DEV_URL}/purchases/all-purchases`, params}
  );

  return {
    data,
    isLoading,
    isError: error,
    mutate,
  }
}


export function useEditPurchase() {
  const updatePurchase = async (purchaseId: number, updatedData: Partial<PurchaseObj>) => {
    const reshapedData = {
        email: updatedData.email,
        code: updatedData.confirmationCode,
        duration: updatedData.duration,
        is_subscription: updatedData.isSubscription,
        number_of_licenses: updatedData.numberOfLicenses,
        order_number: updatedData.orderNumber,
    }
    try {
      const response = await fetch(
        `${process.env.CLOUDRUN_DEV_URL}/purchases/${purchaseId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reshapedData),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update purchase');
      }

      const updatedPurchase = await response.json();

      return updatedPurchase;
    } catch (error) {
      console.error('Error updating purchase:', error);
      throw error;
    }
  };

  return { updatePurchase };
}
