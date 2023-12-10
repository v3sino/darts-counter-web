'use client';

import toast from 'react-hot-toast';
import { CreateTournamentButton } from '../_components/tournament/CreateTournamentButton';
import { NoTournament } from '../_components/tournament/NoTournament';
import { TournamentList } from '../_components/tournament/TournamentList';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from '../_components/LoadingSpinner';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { remapResponseWithStartAt } from '@/server/tournaments';

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
				const fetchedTournaments = await remapResponseWithStartAt(response);

				setTournaments(fetchedTournaments);
				setFetching(false);
			} else {
				toast.error(`Error fetching data: ${response.statusText}`);
			}
		};

		fetchData();
	}, [session]);

	return (
		<>
			{fetching ? (
				<LoadingSpinner />
			) : (
				<>
					{tournaments.length == 0 && <NoTournament />}
					{tournaments.length != 0 && (
						<div className="p-12">
							<div className="pb-12">
								<TournamentList tournaments={tournaments} />
							</div>
							<div>
								<CreateTournamentButton />
							</div>
						</div>
					)}
				</>
			)}
		</>
	);
}
