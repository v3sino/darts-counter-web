import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { doc, collection } from 'firebase/firestore';
import { convertToTournament } from '@/server/tournaments';
import { db } from '@/firebase';
import { redirect } from 'next/navigation';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { Tournament } from '@/types/tournament';
import { Game, GameStatesMap } from '@/types/game';

const firebaseFetchOptions = {
	snapshotListenOptions: { includeMetadataChanges: true }
};

function useTournamentData(tournamentId: string) {
	useSession({
		required: true,
		onUnauthenticated() {
			redirect('/signin');
		}
	});

	const [tournament, tournamentLoading, tournamentError] = useDocument(
		doc(db, 'tournaments', tournamentId),
		firebaseFetchOptions
	);

	const [invites, invitesLoading, invitesError] = useCollection(
		collection(db, 'invites'),
		firebaseFetchOptions
	);

	const [games, gamesLoading, gamesError] = useCollection(
		collection(db, 'games'),
		firebaseFetchOptions
	);

	const [tournamentData, setTournamentData] = useState<Tournament>();
	const [gameStates, setGameStates] = useState<GameStatesMap>({});
	const [error, setError] = useState<string>('');

	useEffect(() => {
		const fetchTournamentData = async () => {
			if (tournamentError) {
				setError(JSON.stringify(tournamentError));
			}
			if (invitesError) {
				setError(JSON.stringify(invitesError));
			}

			if (tournament != null && invites != null) {
				var fetchedTournamentData = await convertToTournament(
					tournament?.data(),
					tournament.id,
					invites
				);
				setTournamentData(fetchedTournamentData);
			}
		};

		const fetchGameStates = async () => {
			if (gamesError) {
				setError(JSON.stringify(gamesError));
			}
			const newGameStates: GameStatesMap = {};
			games?.docs.forEach(gameDoc => {
				const game = gameDoc.data() as Game;
				if (game.gameState.legEnded) {
					if (game.gameState.currentPlayer == 0) {
						newGameStates[gameDoc.id] = '1:0';
					} else {
						newGameStates[gameDoc.id] = '0:1';
					}
				} else {
					newGameStates[gameDoc.id] = 'game in progress';
				}
			});
			setGameStates(newGameStates);
		};

		fetchTournamentData();
		fetchGameStates();
	}, [tournament, invites, games, invitesError, gamesError, tournamentError]);

	return {
		tournamentData,
		gameStates,
		loading: tournamentLoading || invitesLoading || gamesLoading,
		error
	};
}

export default useTournamentData;
