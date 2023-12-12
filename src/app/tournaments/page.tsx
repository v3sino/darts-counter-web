'use client';

import toast from 'react-hot-toast';
import { CreateTournamentButton } from '../_components/tournament/CreateTournamentButton';
import { NoTournament } from '../_components/tournament/NoTournament';
import { TournamentList } from '../_components/tournament/TournamentList';
import { LoadingSpinner } from '../_components/LoadingSpinner';
import { useTournamentsByUID } from '../_hooks/tournament';

export default function TournamentPage() {
	const { tournaments, tournamentsLoading, tournamentsError } =
		useTournamentsByUID();

	if (tournamentsError) {
		toast.error(tournamentsError.message);
	}

	return (
		<>
			{tournaments === undefined || tournamentsLoading ? (
				<LoadingSpinner />
			) : (
				<>
					{tournaments?.length == 0 && <NoTournament />}
					{tournaments?.length != 0 && (
						<div className="p-4 text-white sm:p-12">
							<div className="pb-8">
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
