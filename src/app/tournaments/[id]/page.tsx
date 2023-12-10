'use client';

import { LoadingSpinner } from '@/app/_components/LoadingSpinner';
import { DeleteTournamentButton } from '@/app/_components/tournament/DeleteTournamentButton';
import { TournamentTable } from '@/app/_components/tournament/TournamentTable';
import { UserSelection } from '@/app/_components/tournament/UserSelection';
import { db } from '@/firebase';
import { convertToTournament, getQueryInvitesFrom } from '@/server/tournaments';
import { Tournament } from '@/types/tournament';
import { doc } from 'firebase/firestore';
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
	const session = useSession({
		required: true,
		onUnauthenticated() {
			redirect('/signin');
		}
	});

	const [tournaments, loading, error] = useDocument(
		doc(db, 'tournaments', params.id),
		{
			snapshotListenOptions: { includeMetadataChanges: true }
		}
	);
	const currentUser = session?.data?.user?.uid as string;
	const [invites, invitesLoading, invitesError] = useCollection(
		getQueryInvitesFrom(currentUser),
		{
			snapshotListenOptions: { includeMetadataChanges: true }
		}
	);
	const [tournamentData, setTournamentData] = useState<Tournament>();

	useEffect(() => {
		const fetchTournamentData = async () => {
			if (tournaments != null && invites != null) {
				var fetchedTournamentData = await convertToTournament(
					tournaments?.data(),
					tournaments!.id,
					invites!
				);

				setTournamentData(fetchedTournamentData);
			}
		};

		fetchTournamentData();
	}, [tournaments, invites]);

	if (error) {
		throw Error('Data not found');
	}

	if (loading) {
		return <LoadingSpinner />;
	}

	return (
		<>
			{tournaments && (
				<div className="p-12">
					<h1 className="mb-8 text-4xl font-bold text-white">
						{tournaments.data()?.name}
					</h1>
					<div>
						<span className="pr-4">Location: {tournamentData?.location}</span>
						<span className="pr-4">
							Start: {tournamentData?.startAt.toDateString()}
						</span>
						<DeleteTournamentButton id={params.id} />
					</div>
					<UserSelection
						tournamentId={tournaments.id}
						username={session?.data?.user?.email as string}
					/>
					{tournamentData?.records === undefined ||
					tournamentData?.records.length === 0 ? (
						<>No Users invited yet</>
					) : (
						<div className="pt-6">
							<TournamentTable
								records={tournamentData?.records ?? []}
								currentUser={currentUser}
							/>
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default TournamentPage;
