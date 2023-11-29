import { TournamentRecord, TournamentStatus } from '@/types/tournament';
import { NoTournament } from '../_components/tournament/NoTournament';
import { TournamentTable } from '../_components/tournament/TournamentTable';
import { Timestamp } from 'firebase/firestore';

export default function TournamentPage() {
	// TODO: fetch actual tournaments
	// TODO: probably needs to set username manually (or implement in darts-counter :D)
	var tournaments: TournamentRecord[] = [];
	var tournaments: TournamentRecord[] = [
		{
			id: 'a',
			uid: 'KafQzU4m5IhPPQDEuDjGgrCf7MC3',
			username: 'betusin',
			userHash: 'Kaf674',
			status: TournamentStatus.Sent,
			statusTimestamp: Timestamp.now()
		},
		{
			id: 'b',
			uid: 'KafQzU4m5IhPPQDEuDjGgrCf7MC3',
			username: 'betusin',
			userHash: 'Kaf674',
			status: TournamentStatus.NotInvitedYet
		},
		{
			id: 'c',
			uid: 'KafQzU4m5IhPPQDEuDjGgrCf7MC3',
			username: 'betusin',
			userHash: 'Kaf674',
			status: TournamentStatus.Accepted,
			statusTimestamp: Timestamp.now()
		},
		{
			id: 'c',
			uid: 'KafQzU4m5IhPPQDEuDjGgrCf7MC3',
			username: 'betusin',
			userHash: 'Kaf674',
			status: TournamentStatus.Rejected,
			statusTimestamp: Timestamp.now()
		}
	];

	if (tournaments.length == 0) return <NoTournament />;

	return (
		<div className="p-12">
			<TournamentTable tournaments={tournaments} />
		</div>
	);
}
