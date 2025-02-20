import { FC, HTMLAttributes } from "react";
import { AppForm } from "../form/app-form";

interface CreateAppComponentProps extends HTMLAttributes<HTMLDivElement> {
    isOpen: boolean;
}

export const CreateAppComponent: FC<CreateAppComponentProps> = ({ isOpen, ...props }) => {
    return (
        <div {...props}>
            <AppForm />
        </div>
    );
};
