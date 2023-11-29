import { TournamentRecord, TournamentStatus } from '@/types/tournament';
import {
	RemoveButton,
	ResendInviteButton,
	SendInviteButton
} from './ActionButton';
import { StatusBadge } from './StatusBadge';

interface TableProps {
	tournaments: TournamentRecord[];
}

export const TournamentTable = ({ tournaments }: TableProps) => {
	const renderActionForInvite = (status: TournamentStatus) => {
		switch (status) {
			case TournamentStatus.Sent:
				return <ResendInviteButton />;
			case TournamentStatus.Rejected:
				return <ResendInviteButton />;
			case TournamentStatus.NotInvitedYet:
				return <SendInviteButton />;
			case TournamentStatus.Accepted:
				return <span>-</span>;
			default:
				return null;
		}
	};

	return (
		<div className="overflow-x-auto rounded-lg">
			<table className="w-full text-left text-sm text-gray-400">
				<thead className="bg-gray-700 text-xs uppercase text-gray-400">
					<tr>
						<th scope="col" className="px-6 py-3">
							username
						</th>
						<th scope="col" className="px-6 py-3">
							userhash
						</th>
						<th scope="col" className="px-6 py-3">
							invite status
						</th>
						<th scope="col" className="px-6 py-3">
							action
						</th>
						<th scope="col" className="px-6 py-3">
							<span className="sr-only">remove</span>
						</th>
					</tr>
				</thead>
				<tbody>
					{tournaments.map(tournament => (
						<tr
							key={tournament.id}
							className="border-b border-gray-700 bg-gray-800"
						>
							<td className="px-6 py-4">{tournament.username}</td>
							<td className="px-6 py-4">#{tournament.userHash}</td>
							<td className="px-6 py-4">
								<StatusBadge status={tournament.status} />
							</td>
							<td className="px-6 py-4">
								{renderActionForInvite(tournament.status)}
							</td>
							<td className="px-6 py-4">
								<RemoveButton />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
