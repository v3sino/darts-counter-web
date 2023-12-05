import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Sign Up'
};

const SignUpLayout = ({ children }: { children: React.ReactNode }) => {
	return <div>{children}</div>;
};

export default SignUpLayout;
