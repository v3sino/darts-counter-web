'use client';

import { getSession, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Loading from '@/app/_components/Loading';
import { auth } from '@/firebase';

const Profile = async () => {
	const session = useSession({
		required: true,
		onUnauthenticated() {
			redirect('/signin');
		}
	});

	if (session.status === 'loading') return <Loading />;

	return (
		<div className="p-12">
			<div className="text-center text-xl text-white">
				Welcome back {session?.data?.user?.email}
			</div>
			<h1 className="text-center text-xl text-white">
				Your UID is: {session?.data?.user?.uid}
			</h1>
			
		</div>
	);
};

Profile.requireAuth = true;

export default Profile;
