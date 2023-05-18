import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../lib/axios";
 
interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
}

interface TransactionProviderProps {
  children: ReactNode
}

export const TransactionContext = createContext({} as TransactionContextType);

export function TransactionsProvider({children}: TransactionProviderProps) {

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  const fetchTransactions = async (query?: string) => {
    
    // const url = new URL('/transactions');

    // if(query) {
    //   url.searchParams.append('q', query);
    // }
    
    // const response = await fetch(url);
    // const data = await response.json();
    const response = await api.get('transactions', {
      params: {
        q: query
      }
    });
    setTransactions(response.data);
  }
  
  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionContext.Provider value={{ transactions, fetchTransactions }}>
      {children}
    </TransactionContext.Provider>
  )
}