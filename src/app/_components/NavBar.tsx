'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ProfileNavbarSection from '@/app/_components/ProfileNavbarSection';

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
		<>
			<nav className="flex justify-between bg-blue-400 text-white">
				<div className="flex hidden items-center space-x-4 p-4 md:block">
					{getLink(homePath, 'Home')}
					{getLink(statisticsPath, 'Statistics')}
					{getLink(tournamentsPath, 'Tournaments')}
				</div>
				<div className="flex hidden space-x-4 p-4 md:block">
					<ProfileNavbarSection />
				</div>
			</nav>

			<nav className="bg-blue-400 md:hidden">
				<div className="flex flex-col text-white">
					<div className="mt-4 flex flex-col items-center">
						<div className="py-2">{getLink(homePath, 'Home')}</div>
						<div className="py-2">{getLink(statisticsPath, 'Statistics')}</div>
						<div className="py-2">
							{getLink(tournamentsPath, 'Tournaments')}
						</div>
					</div>
				</div>
				<div className="flex flex-col items-center">
					<div className="mx-4 my-2 border-slate-200 py-2 text-left">
						<ProfileNavbarSection />
					</div>
				</div>
			</nav>
		</>
	);
};
