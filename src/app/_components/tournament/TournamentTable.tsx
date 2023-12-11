'use client';

import { RemoveButton, SendInviteButton } from './ActionButton';
import { StatusBadge } from './StatusBadge';
import { Invite, InviteCreate, InviteStatus } from '@/types/invite';

interface TableProps {
	invites: Invite[];
}

export const TournamentTable = ({ invites: invites }: TableProps) => {
	const renderActionForInvite = (
		status: InviteStatus,
		inviteCreate: InviteCreate
	) => {
		switch (status) {
			case InviteStatus.Pending:
				return <SendInviteButton inviteData={inviteCreate} />;
			case InviteStatus.Rejected:
				return <SendInviteButton inviteData={inviteCreate} />;
			case InviteStatus.NotInvitedYet:
				return <SendInviteButton inviteData={inviteCreate} />;
			case InviteStatus.Accepted:
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
							from
						</th>
						<th scope="col" className="px-6 py-3">
							to
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
					{invites.map(invite => {
						return (
							<tr
								key={invite.id}
								className="border-b border-gray-700 bg-gray-800"
							>
								<td className="px-6 py-4">{invite.inviteFrom}</td>
								<td className="px-6 py-4">{invite.inviteTo}</td>
								<td className="px-6 py-4">
									<StatusBadge
										status={invite.status ?? InviteStatus.NotInvitedYet}
									/>
								</td>
								<td className="px-6 py-4">
									{renderActionForInvite(invite.status, {
										inviteFromUID: invite.inviteFromUID,
										inviteToUID: invite.inviteToUID
									})}
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
