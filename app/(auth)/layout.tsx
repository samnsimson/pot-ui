import { FC, PropsWithChildren } from "react";

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="h-screen w-full">
            <div className="grid h-full grid-cols-6">
                <div className="relative col-span-4 h-full bg-gradient-to-br from-indigo-500 to-teal-400" />
                <div className="col-span-2 flex h-full items-center justify-center p-7">{children}</div>
            </div>
        </div>
    );
};
export default AuthLayout;
