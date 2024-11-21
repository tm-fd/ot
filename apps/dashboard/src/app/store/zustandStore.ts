import { create } from 'zustand';

interface ZPurchase { 
  id: number;
  email: string;
  code: string;
  created_at: string;
  duration: number;
  first_name: string;
  is_subscription: boolean;
  last_name: string;
  number_of_licenses: number;
  number_of_vr_glasses: number;
  order_number: string;
  updated_at: string;
}

interface PurchaseState {
  purchases: ZPurchase[]; // Changed Purchase to ZPurchase
  setPurchases: (purchases: ZPurchase[]) => void; // Changed Purchase to ZPurchase
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const usePurchaseStore = create<PurchaseState>((set) => ({
  purchases: [],
  setPurchases: (purchases) => set({ purchases }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  error: null,
  setError: (error) => set({ error }),
}));

export default usePurchaseStore;
