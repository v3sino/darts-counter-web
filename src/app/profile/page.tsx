'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import ProfileStats from '../_components/statistics/ProfileStats';
import { LoadingSpinner } from '@/app/_components/LoadingSpinner';

const Profile = () => {
	const session = useSession({
		required: true,
		onUnauthenticated() {
			redirect('/signin');
		}
	});

	if (session.status === 'loading') return <LoadingSpinner />;

	return (
		<div className="flex h-fit flex-col">
			<div className="p-10 text-center text-xl text-white">
				Welcome back {session?.data?.user?.email}
			</div>
			<ProfileStats uid={session?.data?.user?.uid} />
		</div>
	);
};

Profile.requireAuth = true;

export default Profile;
