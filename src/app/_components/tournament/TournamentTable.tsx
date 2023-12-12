'use client';

import { SendInviteButton } from './ActionButton';
import { StatusBadge } from './StatusBadge';
import { Invite, InviteCreate, InviteStatus } from '@/types/invite';
import { GameStatesMap } from '@/types/game';

interface TableProps {
	invites: Invite[];
	gameStates: GameStatesMap;
}

export const TournamentTable = ({
	invites: invites,
	gameStates: gameStates
}: TableProps) => {
	const getGameScoreFromInviteId = (inviteId: string) => {
		return gameStates[inviteId] || 'not started yet';
	};

	const renderActionForInvite = (
		status: InviteStatus,
		inviteCreate: InviteCreate
	) => {
		switch (status) {
			case InviteStatus.Pending:
				return <span>-</span>;
			case InviteStatus.Rejected:
				return <SendInviteButton inviteData={inviteCreate} />;
			case InviteStatus.NotInvitedYet:
				return <SendInviteButton inviteData={inviteCreate} />;
			case InviteStatus.Accepted:
				return <SendInviteButton inviteData={inviteCreate} />;
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
							game score
						</th>
					</tr>
				</thead>
				<tbody>
					{invites.map(invite => {
						return (
							<tr
								key={invite.inviteFromUID + invite.inviteToUID}
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
									{getGameScoreFromInviteId(invite.id)}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
