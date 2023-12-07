'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ProfileNavbarSection from '@/app/_components/ProfileNavbarSection';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const homePath = '/';
const statisticsPath = '/statistics';
const tournamentsPath = '/tournaments';

export const NavBar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const currentPath = usePathname();

	const isLinkActive = (path: string) => {
		return currentPath === path
			? 'bg-blue-200 hover:bg-blue-300 text-black p-2 shadow-md rounded-xl'
			: 'p-2';
	};

	const getLink = (path: string, name: string) => {
		return (
			<Link href={`${path}`} className={isLinkActive(path)}>
				{name}
			</Link>
		);
	};

	return (
		<nav className="bg-blue-400 text-white sticky top-0">
			<div className="flex justify-between">
				<div className="flex sm:hidden pl-2 items-center">
					{isOpen ? (
						<FaTimes
							className="cursor-pointer text-white text-4xl"
							onClick={toggleMenu}
						/>
					) : (
						<FaBars
							className="cursor-pointer text-white text-4xl"
							onClick={toggleMenu}
						/>
					)}
				</div>
				<div className="hidden sm:flex items-center space-x-4 p-4">
					{getLink(homePath, 'Home')}
					{getLink(statisticsPath, 'Statistics')}
					{getLink(tournamentsPath, 'Tournaments')}
				</div>
				<div className="flex space-x-4 p-4">
					<ProfileNavbarSection />
				</div>
			</div>
			<div className={`flex-col sm:hidden ${isOpen ? 'flex' : 'hidden'} border-t-2`}>
				{getLink(homePath, 'Home')}
				{getLink(statisticsPath, 'Statistics')}
				{getLink(tournamentsPath, 'Tournaments')}
			</div>
		</nav>
	);
};
