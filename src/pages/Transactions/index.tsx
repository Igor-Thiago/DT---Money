import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PriceHighLight, TransactionTable, TrasactionContainer } from "./styles";
import { TransactionContext } from "../../contexts/TransactionsContexts";
import { dateFormatter, priceFormatter } from "../../utils/formatter";
import { useContextSelector } from "use-context-selector";

export function Transactions() {

    const transactions = useContextSelector(TransactionContext, (context) => {
        return context.transactions;
    })
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
                                        {transaction.type === 'outcome' && '- '} 
                                        {priceFormatter.format(transaction.price)}
                                    </PriceHighLight>    
                                </td>
                                <td>{transaction.category}</td>
                                <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
                            </tr>
                            )
                        })}
                    </tbody>
                </TransactionTable>
                </TrasactionContainer>
        </div>
    )
}