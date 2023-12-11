'use client';

import { LoadingSpinner } from '@/app/_components/LoadingSpinner';
import { DeleteTournamentButton } from '@/app/_components/tournament/DeleteTournamentButton';
import { TournamentTable } from '@/app/_components/tournament/TournamentTable';
import { UserSelection } from '@/app/_components/tournament/UserSelection';
import { db } from '@/firebase';
import { convertToTournament } from '@/server/tournaments';
import { Tournament } from '@/types/tournament';
import { collection, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

type TournamentPageProps = {
	params: {
		id: string;
	};
};

const TournamentPage = ({ params }: TournamentPageProps) => {
	useSession({
		required: true,
		onUnauthenticated() {
			redirect('/signin');
		}
	});

	const [tournament, loading, error] = useDocument(
		doc(db, 'tournaments', params.id),
		{
			snapshotListenOptions: { includeMetadataChanges: true }
		}
	);
	const [invites, invitesLoading, invitesError] = useCollection(
		collection(db, 'invites'),
		{
			snapshotListenOptions: { includeMetadataChanges: true }
		}
	);
	const [tournamentData, setTournamentData] = useState<Tournament>();

	useEffect(() => {
		const fetchTournamentData = async () => {
			if (tournament != null && invites != null) {
				var fetchedTournamentData = await convertToTournament(
					tournament?.data(),
					tournament!.id,
					invites!
				);

				setTournamentData(fetchedTournamentData);
			}
		};

		fetchTournamentData();
	}, [tournament, invites]);

	if (error || invitesError) {
		throw Error('Data not found');
	}

	if (loading || invitesLoading) {
		return <LoadingSpinner />;
	}

	return (
		<>
			{tournament && (
				<div className="p-4 text-white sm:p-12">
					<h1 className="mb-8 text-4xl font-bold">{tournament.data()?.name}</h1>
					<div className="flex flex-col sm:flex-row sm:items-center">
						<div className="sm:pr-4">Location: {tournamentData?.location}</div>
						<div className="sm:pr-4">
							Start: {tournamentData?.startAt.toDateString()}
						</div>
						<div className="sm:pr-4">
							<DeleteTournamentButton id={params.id} />
						</div>
					</div>
					<UserSelection tournamentId={tournament.id} />
					{tournamentData?.invites === undefined ||
					tournamentData?.invites.length === 0 ? (
						<>No Users invited yet</>
					) : (
						<div className="pt-6">
							<TournamentTable invites={tournamentData?.invites ?? []} />
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default TournamentPage;
