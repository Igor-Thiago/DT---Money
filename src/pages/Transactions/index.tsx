import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PriceHighLight, TransactionTable, TrasactionContainer } from "./styles";

export function Transactions() {

    interface Transaction {
        id: number;
        type: 'income' | 'outcome';
        description: string;
        category: string;
        price: number;
        createdAt: string;
    }

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
        <div>
            <Header />
            <Summary />

            <TrasactionContainer>
                <SearchForm />
                <TransactionTable>
                    <tbody>
                        {transactions.map(transaction => {
                            return (
                                <tr key={transaction.id}>
                                <td width="50%">{transaction.description}</td>
                                <td >
                                    <PriceHighLight variant={transaction.type}>
                                        {transaction.price}
                                    </PriceHighLight>    
                                </td>
                                <td>{transaction.category}</td>
                                <td>{transaction.createdAt}</td>
                            </tr>
                            )
                        })}
                    </tbody>
                </TransactionTable>
                </TrasactionContainer>
        </div>
    )
}