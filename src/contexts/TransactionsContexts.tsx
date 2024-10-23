import { createContext, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Transaction {
    id: number;
    type: 'income' | 'outcome';
    description: string;
    category: string;
    price: number;
    createdAt: string;
}

interface TransactionContextType{
    transactions: Transaction[];
    fetchTransactions: (query?: string) => Promise<void>;
}

interface TransactionsProviderProps{
    children: React.ReactNode;
}

export const TransactionContext = createContext({} as TransactionContextType);

export function TransactionsProvider({children}: TransactionsProviderProps){
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    async function fetchTransactions(query?: string){

    // A função fetchTransactions é uma função assíncrona que faz uma requisição à API localizada em 'http://localhost:3000/transactions'.
    // Ela usa o método GET e, caso seja passado um parâmetro query, ele é enviado como parâmetro da requisição.
    // O resultado da requisição é armazenado na variável response e o seu conteúdo é armazenado no estado transactions.
    // A biblioteca axios é utilizada para fazer a requisição. Ela é importada do arquivo src/lib/axios.ts.

        const response = await api.get('/transactions', {
            params: {
                q: query,
            }
        });
        setTransactions(response.data);
    }

    //Para o método fetch acima(serve para fazer o teste com a API) não executar toda vez que a página for renderizada, usamos o useEffect abaixo
    //E ao passar o segundo parâmetro como um array vazio, ele só será executado uma única vez

    useEffect(() => {
        fetchTransactions();
    }, [])
    return (
        <TransactionContext.Provider value={{transactions, fetchTransactions}}>
            {children}
        </TransactionContext.Provider>
    )
}