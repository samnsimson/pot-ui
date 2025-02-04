import { SignupForm } from "@/components/form/signup-form";
import { NextPage } from "next";

const SignupPage: NextPage = () => {
	return (
		<div className="w-full max-w-sm">
			<SignupForm />
		</div>
	);
};
export default SignupPage;
