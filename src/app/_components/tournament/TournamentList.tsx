import { Tournament } from '@/types/tournament';
import { TournamentRow } from './TournamentRow';

export const TournamentList = ({
	tournaments
}: {
	tournaments: Tournament[];
}) => {
	// TODO: similar to TournamentTable, extract to component with variable columns

	return (
		<div className="overflow-x-auto rounded-lg">
			<table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
				<thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" className="px-6 py-3">
							name
						</th>
						<th scope="col" className="px-6 py-3">
							location
						</th>
						<th scope="col" className="px-6 py-3">
							start at
						</th>
					</tr>
				</thead>
				<tbody>
					{tournaments.map(tournament => (
						<TournamentRow key={tournament.id} tournament={tournament} />
					))}
				</tbody>
			</table>
		</div>
	);
};
