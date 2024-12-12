import { create } from 'zustand';
import { persist } from 'zustand/middleware';


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
interface State {
  purchases: PurchaseObj[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
}
interface Actions {
  setPurchases: (purchases: ZPurchase[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setCurrentPage: (page: number) => void;
  reset: () => void
}

const initialState: State = {
  purchases: [],
  isLoading: false,
  error: null,
  currentPage: 0,
}

const usePurchaseStore = create<State & Actions>((set, get, store) => ({
  ...initialState,
  setPurchases: (purchases) => set((state) => ({ purchases: [...state.purchases, ...purchases] })),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setCurrentPage: (currentPage) => set({ currentPage }),
  reset: () => {
    set(initialState)
  },
}));

export default usePurchaseStore;
