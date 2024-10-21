import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { TransactionContext } from "../../../../contexts/TransactionsContexts";

//Abaixo eu defino um esquema de validação do formulário falando os campos que ele vai ter e o tipo deles

const searchFormSchema = z.object({
  query: z.string(),
})

//Aqui eu defino a forma de dados que o formulário vai receber
type SearchFormInputs = z.infer<typeof searchFormSchema>;

export function SearchForm() {

  const {fetchTransactions} = useContext(TransactionContext);

  const { register, handleSubmit, formState: { isSubmitting }} = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema), // isso aplica o esquema de validação ao formulário
  });
  
  //função que vai ser chamada quando o formulário for submetido 
  async function handleSearchTransaction(dados: SearchFormInputs){
    await fetchTransactions(dados.query)
  }


  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransaction)}>
        <input
          type="text"
          placeholder="Buscar Transações"
          {...register('query')}
        />
        <button type="submit" disabled={isSubmitting}>
            <MagnifyingGlass size={20} />
            Buscar
        </button>
    </SearchFormContainer>
  );

}