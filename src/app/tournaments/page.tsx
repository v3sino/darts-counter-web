import { CreateTournamentButton } from '../_components/tournament/CreateTournamentButton';
import { NoTournament } from '../_components/tournament/NoTournament';
import { TournamentList } from '../_components/tournament/TournamentList';
import {
	demo_tournament_list,
	empty_tournament_list
} from '@/data/tournament_mock';

export default function TournamentPage() {
	// TODO: fetch actual tournaments
	// TODO: probably needs to set username manually (or implement in darts-counter :D)
	var tournaments = empty_tournament_list;
	var tournaments = demo_tournament_list;

	if (tournaments.length == 0) return <NoTournament />;

	return (
		<div className="p-12">
			<div className="pb-12">
				<TournamentList tournaments={tournaments} />
			</div>
			<div>
				<CreateTournamentButton />
			</div>
		</div>
	);
}
