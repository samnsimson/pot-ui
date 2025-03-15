"use client";
import { AppModal } from "@/components/app-modal";
import { createContext, FC, Fragment, PropsWithChildren, ReactElement, useCallback, useContext, useEffect, useMemo, useState } from "react";

type ModalProps = {
    size: "sm" | "md" | "lg" | "xl";
};

type ModalOpenProps = {
    title: string;
    description?: string;
    render: () => ReactElement;
};

type ModalContextType = {
    setProps: (props: ModalProps) => void;
    open: (props: ModalOpenProps) => void;
    close: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: FC<PropsWithChildren> = ({ children }) => {
    const defaultModalState = useMemo(() => ({ title: "", render: () => <Fragment /> }), []);
    const [{ title, description, render }, setModalState] = useState<ModalOpenProps>(defaultModalState);
    const [{ size }, setModalProps] = useState<ModalProps>({ size: "md" });
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const open = useCallback((props: ModalOpenProps) => {
        setModalState(props);
        setIsOpen(true);
    }, []);

    const close = useCallback(() => {
        setIsOpen(false);
        setTimeout(() => setModalState(defaultModalState), 3000);
    }, [defaultModalState]);

    const setProps = useCallback((props: ModalProps) => setModalProps(props), []);

    const contextValue = useMemo(() => ({ open, close, setProps }), [open, close, setProps]);

    return (
        <ModalContext.Provider value={contextValue}>
            {children}
            <AppModal size={size} isOpen={isOpen} trigger={setIsOpen} title={title} description={description} component={render()} />
        </ModalContext.Provider>
    );
};

export const useModal = (modalProps?: ModalProps) => {
    const context = useContext(ModalContext);
    if (!context) throw new Error("Modal hook must be used within ModalProvider");
    useEffect(() => modalProps && context.setProps(modalProps), [modalProps, context]);
    const openModal = (modelOpenProps: ModalOpenProps) => context.open(modelOpenProps);
    const closeModal = () => context.close();
    return { openModal, closeModal };
};
