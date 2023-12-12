import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { doc, collection } from 'firebase/firestore';
import { convertToTournament } from '@/server/tournaments';
import { db } from '@/firebase';
import { redirect } from 'next/navigation';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { Tournament } from '@/types/tournament';

function useTournamentData(tournamentId: string) {
	useSession({
		required: true,
		onUnauthenticated() {
			redirect('/signin');
		}
	});

	const [tournament, tournamentLoading, tournamentError] = useDocument(
		doc(db, 'tournaments', tournamentId),
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
					tournament.id,
					invites
				);
				setTournamentData(fetchedTournamentData);
			}
		};

		fetchTournamentData();
	}, [tournament, invites]);

	return {
		tournamentData,
		tournamentLoading,
		tournamentError,
		invites,
		invitesLoading,
		invitesError
	};
}

export default useTournamentData;
