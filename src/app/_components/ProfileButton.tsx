'use client';

import Link from 'next/link';

type ProfileButtonProps = {
	data: any;
	status: string;
};

const ProfileButton = ({ data, status }: ProfileButtonProps) => {
	// TODO: get username by data.uid
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
