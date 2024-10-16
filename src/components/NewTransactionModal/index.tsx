import * as Dialog from "@radix-ui/react-dialog";
import { Overlay, Content, CloseButton, TransactionType, TransactionTypeButton } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";


export function NewTransactionModal() {
    return (
        <Dialog.Portal>
            <Overlay />
            <Content>
                
                <Dialog.Title>Nova Transação</Dialog.Title>
                <CloseButton>
                    <X size={24}/>
                </CloseButton>

                <form action="">
                    <input type="text" placeholder="Descrição" />
                    <input type="number" placeholder="Preço" />
                    <input type="text" placeholder="Categoria" />
                    <button type="submit">Cadastrar</button>
                    <TransactionType>
                        <TransactionTypeButton variant="income" value="income">
                            <ArrowCircleUp size={24} />
                            Entrada
                        </TransactionTypeButton>

                        <TransactionTypeButton variant="outcome" value="outcome">
                            <ArrowCircleDown size={24} />
                            Saída
                        </TransactionTypeButton>
                    </TransactionType>                </form>

                
                
            </Content>
        </Dialog.Portal>
    )
}