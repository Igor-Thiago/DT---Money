import { useEffect, useState, useCallback } from "react";
import { createContext} from 'use-context-selector'
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
    createTransaction: (data: CreateTransactionData) => Promise<void>;
}

interface TransactionsProviderProps{
    children: React.ReactNode;
}

interface CreateTransactionData{
    category: string;
    description: string;
    price: number;
    type: 'income' | 'outcome';
}

export const TransactionContext = createContext({} as TransactionContextType);

export function TransactionsProvider({children}: TransactionsProviderProps){
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const fetchTransactions = useCallback(async(query?: string) =>{

        // A função fetchTransactions é uma função assíncrona que faz uma requisição à API localizada em 'http://localhost:3000/transactions'.
        // Ela usa o método GET e, caso seja passado um parâmetro query, ele é enviado como parâmetro da requisição.
        // O resultado da requisição é armazenado na variável response e o seu conteúdo é armazenado no estado transactions.
        // A biblioteca axios é utilizada para fazer a requisição. Ela é importada do arquivo src/lib/axios.ts.
    
            const response = await api.get('/transactions', {
                params: {
                    _sort: 'createdAt',
                    _order: 'desc',
                    q: query,
                }
            });
            setTransactions(response.data);
        }, []);

    const createTransaction = useCallback(async (data: CreateTransactionData) => {
        const {category, description, price, type } = data;

        
        //Aqui é feita a requisição POST para a API, passando os dados da transação como parâmetros.
        // O método post é utilizado para inserir uma nova transação no banco de dados.
        const response = await api.post('/transactions', {
            category,
            description,
            price,
            type,
            createdAt: new Date(),
        });
        //Aqui é feita a atualização do estado transactions, adicionando a nova transação no início do array.
        setTransactions(state =>[response.data, ...state]);
    }, []); 

    //Para o método fetch acima(serve para fazer o teste com a API) não executar toda vez que a página for renderizada, usamos o useEffect abaixo
    //E ao passar o segundo parâmetro como um array vazio, ele só será executado uma única vez

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions])
    return (
        <TransactionContext.Provider value={{transactions, fetchTransactions,createTransaction}}>
            {children}
        </TransactionContext.Provider>
    )
}