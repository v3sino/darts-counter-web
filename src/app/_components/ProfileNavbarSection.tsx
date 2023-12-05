'use client';

import { useSession } from 'next-auth/react';
import ProfileButton from '@/app/_components/ProfileButton';
import LoginStatus from '@/app/_components/LoginStatus';

const ProfileNavbarSection = () => {
	const { data, status } = useSession();

	if (status === 'loading')
		return <div className="text-center py-2">Loading...</div>;

	return (
		<div className="flex space-x-4">
			<ProfileButton data={data} status={status} />
			<LoginStatus status={status} />
		</div>
	);
};

export default ProfileNavbarSection;
