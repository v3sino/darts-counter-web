import { TournamentStatus } from '@/types/tournament';

interface StatusBadgeProps {
	status: TournamentStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
	const getStatusColor = (status: TournamentStatus) => {
		switch (status) {
			case TournamentStatus.Accepted:
				return 'bg-green-500';
			case TournamentStatus.Rejected:
				return 'bg-red-500';
			case TournamentStatus.Sent:
				return 'bg-blue-500';
			case TournamentStatus.NotInvitedYet:
				return 'bg-gray-500';
			default:
				return 'bg-gray-200';
		}
	};

	return (
		<span
			className={`rounded-full px-4 py-1 text-white ${getStatusColor(status)}`}
		>
			{status}
		</span>
	);
};
