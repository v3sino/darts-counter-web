'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Loading from '@/app/_components/Loading';
import { calculatePlayerStatistics, getGamesOfUser } from '@/server/games';
import { Game } from '@/types/game';
import Metric from '../_components/statistics/Metric';
import {
	FaBullseye,
	FaGlobe,
	FaFireAlt,
	FaCrosshairs
} from 'react-icons/fa';
import ProfileStats from '../_components/statistics/ProfileStats';

const Profile = () => {
	const session = useSession({
		required: true,
		onUnauthenticated() {
			redirect('/signin');
		}
	});

	if (session.status === 'loading') return <Loading />;


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
