import { InviteStatus } from '@/types/invite';

interface StatusBadgeProps {
	status: InviteStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
	const getStatusColor = (status: InviteStatus) => {
		switch (status) {
			case InviteStatus.Accepted:
				return 'bg-green-500';
			case InviteStatus.Rejected:
				return 'bg-red-500';
			case InviteStatus.Pending:
				return 'bg-blue-500';
			case InviteStatus.NotInvitedYet:
				return 'bg-gray-500';
			default:
				return 'bg-gray-200';
		}
	};

	return (
		<span
			className={`inline-block h-6 w-6 rounded-full text-white ${getStatusColor(
				status
			)} sm:h-auto sm:w-auto sm:px-4 sm:py-1`}
			title={status}
		>
			<span className="hidden sm:inline">{status}</span>
		</span>
	);
};
