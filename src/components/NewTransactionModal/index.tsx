import * as Dialog from "@radix-ui/react-dialog";
import { Overlay, Content, CloseButton, TransactionType, TransactionTypeButton } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import * as z from 'zod';
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionContext } from "../../contexts/TransactionsContexts";
import { useContextSelector } from "use-context-selector";

const newTransactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome'])
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {

    const createTransaction = useContextSelector(TransactionContext, (context) => {
        return context.createTransaction;
    }
    );

    const { register, handleSubmit, formState: {isSubmitting}, control, reset} = useForm<NewTransactionFormInputs>({
        resolver: zodResolver(newTransactionFormSchema),
        defaultValues: {type: 'income'}
    });

    async function handleCreateNewTransaction(data: NewTransactionFormInputs) {

        // Essa constante é utilizada para desestruturar os dados da transação que foram passados como parâmetros.
        const {category, description, price, type } = data;

        await new Promise(resolve => setTimeout(resolve, 2000));

        await createTransaction({
            category,
            description,
            price,
            type
        });
        
     
        reset();

    }
    return (
        <Dialog.Portal>
            <Overlay />
            <Content>
                
                <Dialog.Title>Nova Transação</Dialog.Title>
                <CloseButton>
                    <X size={24}/>
                </CloseButton>

                <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                    <input
                    type="text"
                    placeholder="Descrição"
                    required
                    {...register('description')}   
                    />
                    <input
                    type="number"
                    placeholder="Preço"
                    required
                    {...register('price', {valueAsNumber: true})}
                    />
                    <input
                    type="text"
                    placeholder="Categoria"
                    required
                    {...register('category')}
                    />

                    <Controller 
                        control={control}
                        name="type"
                        render={({field}) => {
                            return (
                                <TransactionType onValueChange={field.onChange} value={field.value}>
                                    <TransactionTypeButton variant="income" value="income">
                                        <ArrowCircleUp size={24} />
                                        Entrada
                                    </TransactionTypeButton>

                                    <TransactionTypeButton variant="outcome" value="outcome">
                                        <ArrowCircleDown size={24} />
                                        Saída
                                    </TransactionTypeButton>
                                </TransactionType> 
                            )
                        }}
                    />


                    <button type="submit" disabled={isSubmitting}>Cadastrar</button>

                </form>

                
                
            </Content>
        </Dialog.Portal>
    )
}