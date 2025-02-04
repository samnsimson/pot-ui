import { FC, PropsWithChildren } from "react";

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="w-full h-screen">
			<div className="grid grid-cols-6 h-full">
				<div className="col-span-4 h-full relative bg-gradient-to-br from-indigo-500 to-teal-400" />
				<div className="col-span-2 h-full p-7 flex items-center justify-center">{children}</div>
			</div>
		</div>
	);
};
export default AuthLayout;
