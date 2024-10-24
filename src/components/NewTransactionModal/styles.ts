import styled from "styled-components";
import * as Dialog from "@radix-ui/react-dialog";
import * as RadioGroup from "@radix-ui/react-radio-group";


export const Overlay = styled(Dialog.Overlay)`
    background-color: rgba(0, 0, 0, 0.75);
    position: fixed;
    inset: 0;
    display: flex;
    width: 100vw;
    height: 100vh;
    

`;

export const Content = styled(Dialog.Content)`
    min-width: 32rem;
    border-radius: 6px;
    padding: 2.5rem 3rem;
    background: ${props => props.theme["gray-800"]};


    //Abaixo um hackzin pra centralizar os bgl na tela
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    form {
        margin-top: 2rem;

        display: flex;
        flex-direction: column;
        gap: 1rem;

        input {
            border-radius: 6px;
            border: 0;
            background: ${props => props.theme["gray-900"]};
            color: ${props => props.theme["gray-300"]};
            padding: 1rem;

            &::placeholder {
                color: ${props => props.theme["gray-500"]};
            }
        }

        button[type="submit"] {
            height: 58px;
            border: 0;
            background: ${props => props.theme["green-500"]};
            color: ${props => props.theme.white};
            border-radius: 6px;
            font-weight: bold;
            padding: 0 1.25rem;
            margin-top: 1.5rem;

            cursor: pointer;

            &:disabled {
                opacity: 0.6;
                cursor: not-allowed;
            }

            &:not(:disabled):hover {
                background: ${props => props.theme["green-700"]};
                transition: background-color 0.2s;
            }
        }

    }

`;

export const CloseButton = styled(Dialog.Close)`
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    background: transparent;
    border: 0;
    line-height: 0;
    cursor: pointer;
    color: ${props => props.theme["gray-500"]};
    

    &:hover {
        background-color: ${props => props.theme["red-500"]};
        transition: background-color 0.2s;
    }



`;

export const TransactionType = styled(RadioGroup.Root)`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-top: 0.5rem;
`;

interface TransactionTypeButtonProps {
    variant: "income" | "outcome";
}


export const TransactionTypeButton = styled(RadioGroup.Item)<TransactionTypeButtonProps>`
    background: ${props => props.theme["gray-700"]};
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    border-radius: 6px;
    gap: 0.5rem;
    cursor: pointer;
    padding: 1rem;
    color: ${props => props.theme["gray-300"]};

    svg {
        color: ${props => props.variant === "income" ? props.theme["green-300"] : props.theme["red-300"]};
    }

    &[data-state="checked"] {
        background: ${props => props.variant === "income" ? props.theme["green-500"] : props.theme["red-500"]};
        color: ${props => props.theme.white};

        svg {
            color: ${props => props.theme.white};
        }   
    }

    &[data-state="unchecked"]:hover {
        background: ${props => props.theme["gray-600"]};
        transition: background-color 0.2s;
    }
`;