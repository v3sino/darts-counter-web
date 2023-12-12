'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ProfileNavbarSection from '@/app/_components/ProfileNavbarSection';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChartSimple,
	faChess,
	faHome
} from '@fortawesome/free-solid-svg-icons';

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

	const getLink = (path: string, name: string, icon?: IconProp) => {
		return (
			<Link href={`${path}`} className={isLinkActive(path)}>
				{icon !== undefined && <FontAwesomeIcon icon={icon} className="mr-2" />}
				{name}
			</Link>
		);
	};

	return (
		<nav className="sticky top-0 bg-blue-400 text-white">
			<div className="flex justify-between">
				<div className="flex items-center pl-2 sm:hidden">
					{isOpen ? (
						<FaTimes
							className="cursor-pointer text-4xl text-white"
							onClick={toggleMenu}
						/>
					) : (
						<FaBars
							className="cursor-pointer text-4xl text-white"
							onClick={toggleMenu}
						/>
					)}
				</div>
				<div className="hidden items-center space-x-4 p-4 sm:flex">
					{getLink(homePath, 'Home', faHome)}
					{getLink(statisticsPath, 'Statistics', faChartSimple)}
					{getLink(tournamentsPath, 'Tournaments', faChess)}
				</div>
				<div className="flex space-x-4 p-4">
					<ProfileNavbarSection />
				</div>
			</div>
			<div
				className={`flex-col sm:hidden ${
					isOpen ? 'flex' : 'hidden'
				} border-t-2`}
			>
				{getLink(homePath, 'Home', faHome)}
				{getLink(statisticsPath, 'Statistics', faChartSimple)}
				{getLink(tournamentsPath, 'Tournaments', faChess)}
			</div>
		</nav>
	);
};
