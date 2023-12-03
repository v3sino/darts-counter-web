'use client';

import { TournamentRecord, TournamentStatus } from '@/types/tournament';
import {
	RemoveButton,
	ResendInviteButton,
	SendInviteButton
} from './ActionButton';
import { StatusBadge } from './StatusBadge';
import { getRecordByUID } from '@/server/tournaments';
import { useEffect, useState } from 'react';

interface TableProps {
	records: string[];
}

export const TournamentTable = ({ records: records }: TableProps) => {
	// probably needs to listen on records or tournament doc
	const [tournamentRecords, setTournamentRecords] = useState<
		TournamentRecord[]
	>([]);

	useEffect(() => {
		const fetchTournamentRecords = async () => {
			const fetchedRecords = [];

			for (const record of records) {
				try {
					const tournamentRecord = await getRecordByUID({ id: record });
					fetchedRecords.push(tournamentRecord);
				} catch (error) {
					console.error('Error fetching record:', error);
				}
			}

			setTournamentRecords(fetchedRecords);
		};

		fetchTournamentRecords();
	}, [records]);

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
					{tournamentRecords.map(record => {
						return (
							<tr
								key={record.uid}
								className="border-b border-gray-700 bg-gray-800"
							>
								<td className="px-6 py-4">{record.username}</td>
								<td className="px-6 py-4">#{record.inviteHash}</td>
								<td className="px-6 py-4">
									<StatusBadge
										status={record.status ?? TournamentStatus.NotInvitedYet}
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
