import { useContext} from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PriceHighLight, TransactionTable, TrasactionContainer } from "./styles";
import { TransactionContext } from "../../contexts/TransactionsContexts";

export function Transactions() {

    const {transactions} = useContext(TransactionContext);
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