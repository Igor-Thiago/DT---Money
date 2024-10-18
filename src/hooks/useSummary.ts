import { useContext } from "react";
import { TransactionContext } from "../contexts/TransactionsContexts";

export function useSummary(){
    const {transactions} = useContext(TransactionContext);
    
    const summary = transactions.reduce(
        (acc, transaction) => {

            if(transaction.type === 'income'){
                acc.income += transaction.price;
                acc.total += transaction.price;
            } else {
                acc.outcome += transaction.price;
                acc.total -= transaction.price;
            }
            return acc;
        },
        {income: 0, outcome: 0, total: 0});
    //Esse método reduce serve para mudar um tipo de dado para outro, nesse caso, ele está mudando um array de objetos para um objeto com 3 propriedades
        return summary;
}