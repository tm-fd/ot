import { create } from 'zustand';

export interface ZPurchase { 
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

export interface PurchaseObj { 
  id: number,
  orderNumber: string,
  email: string,
  customerName: string,
  date: string,
  updatedDate: string,
  confirmationCode: string,
  numberOfVrGlasses: number,
  numberOfLicenses: number,
  isSubscription: boolean,
  duration: number,       
}

interface PurchaseState {
  purchases: ZPurchase[]; // Changed Purchase to ZPurchase
  setPurchases: (purchases: ZPurchase[]) => void; // Changed Purchase to ZPurchase
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const usePurchaseStore = create<PurchaseState>((set) => ({
  purchases: [],
  setPurchases: (purchases) => set((state) => ({ purchases: [...state.purchases, ...purchases] })),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  error: null,
  setError: (error) => set({ error }),
  currentPage: 0,
  setCurrentPage: (currentPage) => set({ currentPage }),
}));

export default usePurchaseStore;
