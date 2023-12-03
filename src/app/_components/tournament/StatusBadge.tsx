import { TournamentRecordStatus } from '@/types/tournament';

interface StatusBadgeProps {
	status: TournamentRecordStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
	const getStatusColor = (status: TournamentRecordStatus) => {
		switch (status) {
			case TournamentRecordStatus.Accepted:
				return 'bg-green-500';
			case TournamentRecordStatus.Rejected:
				return 'bg-red-500';
			case TournamentRecordStatus.Sent:
				return 'bg-blue-500';
			case TournamentRecordStatus.NotInvitedYet:
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
