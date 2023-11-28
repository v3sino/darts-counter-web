'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const LoginStatus = () => {
	const { status } = useSession();
	if (status === 'loading') return <div>Loading...</div>;
	if (status === 'unauthenticated') {
		return (
			<Link className="rounded border border-white p-2" href="/signin">
				Sign in
			</Link>
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
