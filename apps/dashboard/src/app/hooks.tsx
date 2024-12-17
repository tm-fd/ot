import useSWR from 'swr'
import { PurchaseObj } from './store/purchaseStore';
import { useState, useEffect } from 'react';
import axios from 'axios';

 

export function usePurchasesData(params) {
  const { data, error, isLoading, mutate } = useSWR(
    {url: `/purchases`, params},
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

// useAdditionalInfo
interface AdditionalInfo {
  id: number;
  purchase_id: number;
  info: string;
}

export const useAdditionalInfo = (purchaseId: number) => {
  const [additionalInfos, setAdditionalInfos] = useState<AdditionalInfo[]>([]);
  const [editedAdditionalInfos, setEditedAdditionalInfos] = useState<Record<any>>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchAdditionalInfo = async () => {
    setError(null);
    try {
      const response = await axios.get(`${process.env.CLOUDRUN_DEV_URL}/purchases/additional-info/${purchaseId}`);
      if (response.status === 200 && Array.isArray(response.data)) {
        setAdditionalInfos(response.data);
      }
    } catch (error) {
      console.error('Error fetching additional info:', error);
      setError('No additional info');
    }
  };

  useEffect(() => {
    fetchAdditionalInfo();
  }, [purchaseId]);

  useEffect(() => {
    console.log(editedAdditionalInfos)
  }, [editedAdditionalInfos]);

 

  const editAdditionalInfo = (id: number, newInfo: string) => {
    setEditedAdditionalInfos({id, info: newInfo});
    setAdditionalInfos((prev) => prev.map((info) => (info.id === id ? { ...info, info: newInfo } : info)));
  };

 

  const saveAdditionalInfo = async () => {
    try {
      await axios.patch(`${process.env.CLOUDRUN_DEV_URL}/purchases/additional-info/${editedAdditionalInfos.id}`, {
        info: editedAdditionalInfos.info
      });
    } catch (error) {
      console.error('Error saving additional info:', error);
      throw error;
    }
  };

  return {
    additionalInfos,
    error,
    setEditedAdditionalInfos,
    editedAdditionalInfos,
    editAdditionalInfo,
    saveAdditionalInfo,
    refetchAdditionalInfo: fetchAdditionalInfo
  };
};
