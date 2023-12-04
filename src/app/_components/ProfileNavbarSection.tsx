'use client';

import { useSession } from 'next-auth/react';
import ProfileButton from '@/app/_components/ProfileButton';
import LoginStatus from '@/app/_components/LoginStatus';

const ProfileNavbarSection = () => {
	const { data, status } = useSession();

	if (status === 'loading')
		return <div className="text-center">Loading...</div>;

	return (
		<>
			<ProfileButton data={data} status={status} />
			<LoginStatus status={status} />
		</>
	);
};

export default ProfileNavbarSection;
