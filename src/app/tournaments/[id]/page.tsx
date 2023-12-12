'use client';

import { LoadingSpinner } from '@/app/_components/LoadingSpinner';
import { DeleteTournamentButton } from '@/app/_components/tournament/DeleteTournamentButton';
import { TournamentTable } from '@/app/_components/tournament/TournamentTable';
import { UserSelection } from '@/app/_components/tournament/UserSelection';
import { useTournamentData } from '@/app/_hooks/tournament';
import {
	faFlagCheckered,
	faLocationDot
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import toast from 'react-hot-toast';
import { Tooltip } from 'react-tooltip';

type TournamentPageProps = {
	params: {
		id: string;
	};
};

const TournamentPage = ({ params }: TournamentPageProps) => {
	const { tournamentData, gameStates, loading, error } = useTournamentData(
		params.id
	);

	if (error) {
		toast.error(error);
	}

	if (loading) {
		return <LoadingSpinner />;
	}

	return (
		<>
			{tournamentData && (
				<div className="p-4 text-white sm:p-12">
					<h1 className="mb-8 text-4xl font-bold">{tournamentData.name}</h1>
					<div className="flex flex-col sm:flex-row sm:items-center">
						<div
							className="pb-1 sm:pr-4"
							data-tooltip-id={`location-tooltip`}
							data-tooltip-content={`Location of tournament`}
						>
							<FontAwesomeIcon icon={faLocationDot} className="mr-2" />
							<Tooltip id={`location-tooltip`} />
							{tournamentData?.location}
						</div>
						<div
							className="pb-1 sm:pr-4"
							data-tooltip-id={`start-tooltip`}
							data-tooltip-content={`Tournament starts at`}
						>
							<FontAwesomeIcon icon={faFlagCheckered} className="mr-2" />
							<Tooltip id={`start-tooltip`} />
							{tournamentData?.startAt.toLocaleDateString()}{' '}
							{tournamentData?.startAt.toLocaleTimeString()}
						</div>
						<div className="pb-1 sm:pr-4">
							<DeleteTournamentButton id={params.id} />
						</div>
					</div>
					<UserSelection tournamentId={tournamentData.id} />
					{tournamentData?.invites === undefined ||
					tournamentData?.invites.length === 0 ? (
						<>No Users invited yet</>
					) : (
						<div className="pt-6">
							<TournamentTable
								invites={tournamentData?.invites ?? []}
								gameStates={gameStates}
							/>
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default TournamentPage;
