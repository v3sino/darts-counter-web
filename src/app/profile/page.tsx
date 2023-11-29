'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Loading from '@/app/_components/Loading';
import Link from 'next/link';

const Profile = () => {
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
			<div className="mt-12 flex justify-items-center">
				<Link
					href="/statistics"
					className="group relative m-0 flex h-72 w-96 rounded-xl shadow-xl ring-gray-900/5 sm:mx-auto sm:max-w-lg"
				>
					<div className="z-10 h-full w-full overflow-hidden rounded-xl border border-gray-200 opacity-80 transition duration-300 ease-in-out group-hover:opacity-100 dark:border-gray-700 dark:opacity-70">
						<img
							src="https://i.pinimg.com/originals/d3/c6/18/d3c618d8ec0a8b60a4ca424878c4aed4.png"
							className="animate-fade-in block h-full w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110"
							alt=""
						/>
					</div>
					<div className="absolute bottom-0 z-20 m-0 pb-4 ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
						<h1 className="font-serif text-2xl font-bold text-white shadow-xl">
							Statistics
						</h1>
						<h1 className="text-sm font-light text-gray-200 shadow-xl">
							Check out the statistics
						</h1>
					</div>
				</Link>
				<Link
					href="/tournament"
					className="group relative m-0 flex h-72 w-96 rounded-xl shadow-xl ring-gray-900/5 sm:mx-auto sm:max-w-lg"
				>
					<div className="z-10 h-full w-full overflow-hidden rounded-xl border border-gray-200 opacity-80 transition duration-300 ease-in-out group-hover:opacity-100 dark:border-gray-700 dark:opacity-70">
						<img
							src="https://www.pngarts.com/files/4/Dartboard-PNG-Picture.png"
							className="animate-fade-in block h-full w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110"
							alt=""
						/>
					</div>
					<div className="absolute bottom-0 z-20 m-0 pb-4 ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
						<h1 className="font-serif text-2xl font-bold text-white shadow-xl">
							Tournaments
						</h1>
						<h1 className="text-sm font-light text-gray-200 shadow-xl">
							Invite users to tournaments
						</h1>
					</div>
				</Link>
			</div>
		</div>
	);
};

Profile.requireAuth = true;

export default Profile;
