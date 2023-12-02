'use client';

import toast from 'react-hot-toast';
import { CreateTournamentButton } from '../_components/tournament/CreateTournamentButton';
import { NoTournament } from '../_components/tournament/NoTournament';
import { TournamentList } from '../_components/tournament/TournamentList';
import { useEffect, useState } from 'react';

export default function TournamentPage() {
	// TODO: probably needs to set username manually (or implement in darts-counter :D)
	const [tournaments, setTournaments] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			// TODO: get actual current user
			const currentUser = 'KafQzU4m5IhPPQDEuDjGgrCf7MC3';
			const response = await fetch(
				`/api/tournaments/KafQzU4m5IhPPQDEuDjGgrCf7MC3`,
				{
					method: 'GET'
				}
			);

			if (response.ok) {
				const fetchedTournaments = await response.json();

				// TODO: probably move somewhere to a reusable place?
				fetchedTournaments.map((tournament: { startAt: any }) => {
					if (
						tournament.startAt &&
						typeof tournament.startAt.seconds === 'number'
					) {
						tournament.startAt = new Date(tournament.startAt.seconds * 1000); // Convert seconds to milliseconds
					}
				});

				setTournaments(fetchedTournaments);
			} else {
				toast.error(`Error fetching data: ${response.statusText}`);
			}
		};

		fetchData();
	}, []);

	if (tournaments.length == 0) return <NoTournament />;

	return (
		<div className="p-12">
			<div className="pb-12">
				<TournamentList tournaments={tournaments} />
			</div>
			<div>
				<CreateTournamentButton />
			</div>
		</div>
	);
}
