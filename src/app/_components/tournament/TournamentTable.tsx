'use client';

import { collection } from 'firebase/firestore';
import { SendInviteButton } from './ActionButton';
import { StatusBadge } from './StatusBadge';
import { Invite, InviteCreate, InviteStatus } from '@/types/invite';
import { db } from '@/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useEffect, useState } from 'react';
import { Game } from '@/types/game';

interface TableProps {
	invites: Invite[];
}

type GameStatesMap = Record<string, string>;

export const TournamentTable = ({ invites: invites }: TableProps) => {
	const [games, gamesLoading, gamesError] = useCollection(
		collection(db, 'games'),
		{
			snapshotListenOptions: { includeMetadataChanges: true }
		}
	);
	const [gameStates, setGameStates] = useState<GameStatesMap>({});

	useEffect(() => {
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
	}, [games]);

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
