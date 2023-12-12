import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { doc, collection, where, query } from 'firebase/firestore';
import { convertToTournament } from '@/server/tournaments';
import { db } from '@/firebase';
import { redirect } from 'next/navigation';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { Tournament, tournamentConverter } from '@/types/tournament';
import { Game, GameStatesMap } from '@/types/game';

export const firebaseFetchOptions = {
	snapshotListenOptions: { includeMetadataChanges: true }
};

export const useTournamentData = (tournamentId: string) => {
	const session = useSession({
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
				try {
					var fetchedTournamentData = await convertToTournament(tournament);
					setTournamentData(fetchedTournamentData);
				} catch (error) {
					if (error instanceof Error) {
						setError(error.message);
					}
				}
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
	}, [
		tournament,
		invites,
		games,
		invitesError,
		gamesError,
		tournamentError,
		session
	]);

	return {
		tournamentData,
		gameStates,
		loading: tournamentLoading || invitesLoading || gamesLoading,
		error
	};
};

export const useTournamentsByUID = () => {
	const session = useSession({
		required: true,
		onUnauthenticated() {
			redirect('/signin');
		}
	});
	const uid = session?.data?.user?.uid as string;
	const [tournamentCollection, tournamentsLoading, tournamentsError] =
		useCollection(
			query(collection(db, 'tournaments'), where('organizedByUID', '==', uid)),
			firebaseFetchOptions
		);
	const [tournaments, setTournaments] = useState<Tournament[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			var convertedTournaments: Tournament[] = [];
			tournamentCollection?.forEach(doc => {
				convertedTournaments.push(tournamentConverter.fromFirestore(doc));
			});
			setTournaments(convertedTournaments);
		};

		fetchData();
	}, [session, tournamentCollection]);

	return { tournaments, tournamentsLoading, tournamentsError };
};
