"use client";
import { AppDrawer } from "@/components/app-drawer";
import { createContext, FC, Fragment, PropsWithChildren, ReactElement, useContext, useState } from "react";

interface RenderProps {
    isOpen: boolean;
}

interface DrawerProps {
    title: string;
    description?: string;
    render: (props: RenderProps) => ReactElement;
}

interface DrawerContextType {
    openDrawer: (props: DrawerProps) => void;
    closeDrawer: () => void;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const DrawerProvider: FC<PropsWithChildren> = ({ children }) => {
    const defaultDrawerProps = { title: "", render: () => <Fragment /> };
    const [isOpen, setIsOpen] = useState(false);
    const [{ title, description, render }, setDrawerProps] = useState<DrawerProps>(defaultDrawerProps);

    const openDrawer = (props: DrawerProps) => {
        setDrawerProps(props);
        setIsOpen(true);
    };

    const closeDrawer = () => {
        setIsOpen(false);
        setTimeout(() => setDrawerProps(defaultDrawerProps), 300);
    };

    return (
        <DrawerContext.Provider value={{ openDrawer, closeDrawer }}>
            {children}
            <AppDrawer open={isOpen} title={title} description={description} component={render({ isOpen })} onClose={closeDrawer} />
        </DrawerContext.Provider>
    );
};

export const useDrawer = () => {
    const context = useContext(DrawerContext);
    if (!context) throw new Error("useDrawer must be used within a DrawerProvider");
    return context;
};
