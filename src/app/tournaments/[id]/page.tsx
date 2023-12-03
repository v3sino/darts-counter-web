'use client';

import { LoadingSpinner } from '@/app/_components/LoadingSpinner';
import { DeleteTournamentButton } from '@/app/_components/tournament/DeleteTournamentButton';
import { TournamentTable } from '@/app/_components/tournament/TournamentTable';
import { UserSelection } from '@/app/_components/tournament/UserSelection';
import { db } from '@/firebase';
import { Tournament } from '@/types/tournament';
import { doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';

type TournamentPageProps = {
	params: {
		id: string;
	};
};

const TournamentPage = ({ params }: TournamentPageProps) => {
	const [value, loading, error] = useDocument(
		doc(db, 'tournaments', params.id),
		{
			snapshotListenOptions: { includeMetadataChanges: true }
		}
	);

	if (error) {
		throw Error('Data not found');
	}

	if (loading) {
		return <LoadingSpinner />;
	}

	const tournamentData = value?.data() as Tournament | undefined;
	//TODO: use converter instead of this hack https://firebase.google.com/docs/firestore/manage-data/add-data#custom_objects

	return (
		<>
			{value && (
				<div className="p-12">
					<h1 className="mb-8 text-4xl font-bold text-white">
						{value.data()?.name}
					</h1>
					<div>
						<span className="pr-4">Location: {tournamentData?.location}</span>
						<span className="pr-4">Start: {value.data()?.startAt.seconds}</span>
						<DeleteTournamentButton id={params.id} />
					</div>
					<UserSelection tournamentId={value.id} />
					{tournamentData?.records === undefined ||
					tournamentData?.records.length === 0 ? (
						<>No Users invited yet</>
					) : (
						<div className="pt-6">
							<TournamentTable records={tournamentData?.records ?? []} />
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default TournamentPage;
