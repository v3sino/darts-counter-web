'use client';

import { Tournament } from '@/types/tournament';
import { useRouter } from 'next/navigation';

type TournamentRowProps = {
	tournament: Tournament;
};

export const TournamentRow = ({ tournament }: TournamentRowProps) => {
	const router = useRouter();

	const hasStarted = tournament.startAt < new Date();
	const rowClass = hasStarted
		? 'bg-blue-950 hover:bg-blue-950/70'
		: 'bg-gray-800 hover:bg-gray-800/70 ';

	const redirect = () => {
		router.push(`/tournaments/${tournament.id}`);
	};

	return (
		<tr
			className={`cursor-pointer border-b border-gray-700 ${rowClass}`}
			onClick={redirect}
		>
			<td className="px-6 py-4">{tournament.name}</td>
			<td className="px-6 py-4">{tournament.location}</td>
			<td className="px-6 py-4">{`${tournament.startAt.toLocaleDateString()} at ${tournament.startAt.toLocaleTimeString()}`}</td>
		</tr>
	);
};
