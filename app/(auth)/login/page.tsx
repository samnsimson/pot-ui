import { LoginForm } from "@/components/form/login-form";
import { NextPage } from "next";

const LoginPage: NextPage = () => {
	return (
		<div className="w-full max-w-sm">
			<LoginForm />
		</div>
	);
};
export default LoginPage;
