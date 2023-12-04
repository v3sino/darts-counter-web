'use client';

import { signOut } from 'next-auth/react';
import Link from 'next/link';

type LoginStatusProps = {
	status: string;
};

const LoginStatus = ({ status }: LoginStatusProps) => {
	if (status === 'unauthenticated') {
		return (
			<div className="flex space-x-4">
				<Link className="rounded border border-white p-2" href="/signin">
					Sign in
				</Link>
				<Link className="rounded border border-white p-2" href="/signup">
					Sign up
				</Link>
			</div>
		);
	}

	return (
		<button
			onClick={() => signOut()}
			className="rounded border border-white p-2"
		>
			Sign out
		</button>
	);
};

export default LoginStatus;
