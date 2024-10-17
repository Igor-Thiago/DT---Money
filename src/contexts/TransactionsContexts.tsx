import { createContext, useEffect, useState } from "react";

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
}

interface TransactionsProviderProps{
    children: React.ReactNode;
}

export const TransactionContext = createContext({} as TransactionContextType);

export function TransactionsProvider({children}: TransactionsProviderProps){
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    async function loadTransactions() {

    // A função loadTransactions é uma função assíncrona que faz uma requisição à API localizada em 'http://localhost:3000/transactions'.
    // Ela usa o método fetch para buscar os dados das transações no servidor. 
    // O 'await' garante que o código aguarde a resposta da API antes de prosseguir.
    // Depois de receber a resposta, ela converte a resposta em formato JSON com o método response.json().
    // Finalmente, os dados são exibidos no console através do console.log(data).

        const response = await fetch('http://localhost:3000/transactions')
        const data = await response.json();
        setTransactions(data);
    }

    //Para o método fetch acima(serve para fazer o teste com a API) não executar toda vez que a página for renderizada, usamos o useEffect abaixo
    //E ao passar o segundo parâmetro como um array vazio, ele só será executado uma única vez

    useEffect(() => {
        loadTransactions();
    }, [])
    return (
        <TransactionContext.Provider value={{transactions}}>
            {children}
        </TransactionContext.Provider>
    )
}