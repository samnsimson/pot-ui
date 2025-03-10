"use client";
import { AppModal } from "@/components/app-modal";
import { createContext, FC, Fragment, PropsWithChildren, ReactElement, useContext, useState } from "react";

type ModalProps = {
    title: string;
    description?: string;
    render: (props?: any) => ReactElement;
};

type ModalContextType = {
    open: (props: ModalProps) => void;
    close: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: FC<PropsWithChildren> = ({ children }) => {
    const defaultModalState = { title: "", render: () => <Fragment /> };
    const [{ title, description, render }, setModalState] = useState<ModalProps>(defaultModalState);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const open = (props: ModalProps) => {
        setModalState(props);
        setIsOpen(true);
    };
    const close = () => {
        setIsOpen(false);
        setTimeout(() => setModalState(defaultModalState), 3000);
    };

    return (
        <ModalContext.Provider value={{ open, close }}>
            {children}
            <AppModal isOpen={isOpen} trigger={setIsOpen} title={title} description={description} component={render()} />
        </ModalContext.Provider>
    );
};

export const useModal = (props: ModalProps) => {
    const context = useContext(ModalContext);
    if (!context) throw new Error("Modal hook must be used within a ModalProvider");
    const openModal = () => context.open(props);
    const closeModal = () => context.close();
    return { openModal, closeModal };
};
