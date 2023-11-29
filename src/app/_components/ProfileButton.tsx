'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

const ProfileButton = () => {
	const { data, status } = useSession();

	if (status === 'loading') return <div>Loading...</div>;

	return (
		<>
			{status == 'authenticated' && (
				<Link
					href="/profile"
					className="flex items-center justify-center rounded-full bg-blue-500 p-2 text-white"
				>
					{data?.user?.email as string}
				</Link>
			)}
		</>
	);
};

export default ProfileButton;
