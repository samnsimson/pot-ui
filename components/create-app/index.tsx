import { FC, HTMLAttributes } from "react";

interface CreateAppComponentProps extends HTMLAttributes<HTMLDivElement> {
    isOpen: boolean;
}

export const CreateAppComponent: FC<CreateAppComponentProps> = ({ isOpen, ...props }) => {
    return <div {...props}>CreateAppComponent {isOpen ? "open" : "closed"}</div>;
};
