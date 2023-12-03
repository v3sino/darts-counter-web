'use client';

import { TournamentRecord, TournamentRecordStatus } from '@/types/tournament';
import {
	RemoveButton,
	ResendInviteButton,
	SendInviteButton
} from './ActionButton';
import { StatusBadge } from './StatusBadge';

interface TableProps {
	records: TournamentRecord[];
}

export const TournamentTable = ({ records: records }: TableProps) => {
	const renderActionForInvite = (status: TournamentRecordStatus) => {
		switch (status) {
			case TournamentRecordStatus.Sent:
				return <ResendInviteButton />;
			case TournamentRecordStatus.Rejected:
				return <ResendInviteButton />;
			case TournamentRecordStatus.NotInvitedYet:
				return <SendInviteButton />;
			case TournamentRecordStatus.Accepted:
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
					{records.map(record => {
						return (
							<tr
								key={record.uid}
								className="border-b border-gray-700 bg-gray-800"
							>
								<td className="px-6 py-4">{record.username}</td>
								<td className="px-6 py-4">#{record.inviteHash}</td>
								<td className="px-6 py-4">
									<StatusBadge
										status={
											record.status ?? TournamentRecordStatus.NotInvitedYet
										}
									/>
								</td>
								<td className="px-6 py-4">
									{renderActionForInvite(record.status)}
								</td>
								<td className="px-6 py-4">
									<RemoveButton
										onClick={() => {
											console.log('TODO: remove user from tournament');
										}}
									/>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
