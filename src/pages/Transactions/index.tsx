import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PriceHighLight, TransactionTable, TrasactionContainer } from "./styles";

export function Transactions() {
    return (
        <div>
            <Header />
            <Summary />

            <TrasactionContainer>
                <SearchForm />
                <TransactionTable>
                    <tbody>
                        <tr>
                            <td width="50%">Desenvolvimento do site</td>
                            <td >
                                <PriceHighLight variant="income">
                                    R$ 12.000
                                </PriceHighLight>    
                            </td>
                            <td>Venda</td>
                            <td>20/02/2021</td>
                        </tr>
                        <tr>
                            <td width="50%">Hamburger</td>
                            <td >
                                <PriceHighLight variant="outcome">
                                        R$ 50.00
                                </PriceHighLight>   
                            </td>
                            <td>Alimentação</td>
                            <td>20/03/2021</td>
                        </tr>  
                    </tbody>
                </TransactionTable>
                </TrasactionContainer>
        </div>
    )
}