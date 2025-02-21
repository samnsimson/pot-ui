"use client";
import { AppDrawer } from "@/components/app-drawer";
import { createContext, FC, Fragment, PropsWithChildren, ReactElement, useContext, useRef, useState } from "react";

interface RenderProps {
    isOpen: boolean;
}

interface DrawerProps {
    title: string;
    description?: string;
    render: (props: RenderProps) => ReactElement;
}

interface DrawerContextType {
    open: (props: DrawerProps) => void;
    close: () => void;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const DrawerProvider: FC<PropsWithChildren> = ({ children }) => {
    const defaultDrawerProps = { title: "", render: () => <Fragment /> };
    const [isOpen, setIsOpen] = useState(false);
    const [{ title, description, render }, setDrawerProps] = useState<DrawerProps>(defaultDrawerProps);

    const open = (props: DrawerProps) => {
        setDrawerProps(props);
        setIsOpen(true);
    };

    const close = () => {
        setIsOpen(false);
        setTimeout(() => setDrawerProps(defaultDrawerProps), 300);
    };

    return (
        <DrawerContext.Provider value={{ open, close }}>
            {children}
            <AppDrawer open={isOpen} title={title} description={description} component={render({ isOpen })} onClose={close} />
        </DrawerContext.Provider>
    );
};

export const useDrawer = (props: DrawerProps) => {
    const context = useContext(DrawerContext);
    if (!context) throw new Error("useDrawer must be used within a DrawerProvider");

    const openDrawer = () => context.open(props);
    return { openDrawer };
};
