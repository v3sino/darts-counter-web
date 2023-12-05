'use client';

import toast from 'react-hot-toast';
import { CreateTournamentButton } from '../_components/tournament/CreateTournamentButton';
import { NoTournament } from '../_components/tournament/NoTournament';
import { TournamentList } from '../_components/tournament/TournamentList';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from '../_components/LoadingSpinner';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function TournamentPage() {
	// TODO: probably needs to set username manually (or implement in darts-counter :D)
	const [tournaments, setTournaments] = useState([]);
	const [fetching, setFetching] = useState(true);
	const session = useSession({
		required: true,
		onUnauthenticated() {
			redirect('/signin');
		}
	});

	useEffect(() => {
		const fetchData = async () => {
			const currentUser = session?.data?.user?.uid as string;
			const response = await fetch(`/api/tournaments?uid=${currentUser}`, {
				method: 'GET'
			});

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
				setFetching(false);
			} else {
				toast.error(`Error fetching data: ${response.statusText}`);
			}
		};

		fetchData();
	}, []);

	return (
		<>
			{fetching ? (
				<LoadingSpinner />
			) : (
				<>
					{tournaments.length == 0 && <NoTournament />}
					<div className="p-12">
						<div className="pb-12">
							<TournamentList tournaments={tournaments} />
						</div>
						<div>
							<CreateTournamentButton />
						</div>
					</div>
				</>
			)}
		</>
	);
}
