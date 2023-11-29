'use client';

import Link from 'next/link';
import LoginStatus from '@/app/_components/LoginStatus';
import ProfileButton from '@/app/_components/ProfileButton';
import { usePathname } from 'next/navigation';

const homePath = '/';
const statisticsPath = '/statistics';
const tournamentsPath = '/tournaments';

export const NavBar = () => {
	const currentPath = usePathname();

	const isLinkActive = (path: string) => {
		return currentPath === path
			? 'bg-blue-200 hover:bg-blue-300 text-black p-2 shadow-md rounded-xl'
			: 'p-1';
	};

	const getLink = (path: string, name: string) => {
		return (
			<Link href={`${path}`} className={isLinkActive(path)}>
				{name}
			</Link>
		);
	};
	return (
		<div className="sticky top-0 flex justify-between bg-blue-400 p-4 text-white">
			<div className="flex items-center space-x-4">
				{getLink(homePath, 'Home')}
				{getLink(statisticsPath, 'Statistics')}
				{getLink(tournamentsPath, 'Tournaments')}
			</div>
			<div className="flex space-x-4">
				<ProfileButton />
				<LoginStatus />
			</div>
		</div>
	);
};
