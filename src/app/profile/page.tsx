'use client';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Loading from '@/app/_components/Loading';

const Profile = () => {
	const session = useSession({
		required: true,
		onUnauthenticated() {
			redirect('/signin');
		}
	});

	if (session.status === 'loading') return <Loading />;

	return (
		<div className="p-8">
			<div className="text-white">{session?.data?.user?.email}</div>
			<button className="text-white" onClick={() => signOut()}>
				Logout
			</button>
		</div>
	);
};

Profile.requireAuth = true;

export default Profile;
