import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { doc, collection } from 'firebase/firestore';
import { convertToTournament } from '@/server/tournaments';
import { db } from '@/firebase';
import { redirect } from 'next/navigation';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { Tournament } from '@/types/tournament';
import { Game } from '@/types/game';

// TODO: move to types
type GameStatesMap = Record<string, string>;

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

	const [games, gamesLoading, gamesError] = useCollection(
		collection(db, 'games'),
		{
			snapshotListenOptions: { includeMetadataChanges: true }
		}
	);

	// TODO: handle errors

	const [tournamentData, setTournamentData] = useState<Tournament>();
	const [gameStates, setGameStates] = useState<GameStatesMap>({});

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

		const fetchGameStates = async () => {
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
	}, [tournament, invites, games]);

	return {
		tournamentData,
		gameStates,
		loading: tournamentLoading || invitesLoading || gamesLoading,
		tournamentError,
		invitesError
	};
}

export default useTournamentData;
