'use client';

import toast from 'react-hot-toast';

interface ActionButtonProps {
	label: string;
	onClick: () => void;
	bgColor: string;
	textColor?: string;
}

export const ActionButton = ({
	label,
	onClick,
	bgColor,
	textColor
}: ActionButtonProps) => {
	return (
		<button
			onClick={onClick}
			className={`rounded px-4 py-2 ${textColor ?? 'text-white'} ${bgColor}`}
		>
			{label}
		</button>
	);
};

// TODO: probably needed to pass some arguments to handle onClick
interface SpecificActionButtonProps {}

export const ResendInviteButton = () => {
	// TODO: handle onClick
	return (
		<ActionButton
			label="resend invite"
			onClick={() => toast.success('resend invite')}
			bgColor="bg-white"
			textColor="text-black"
		/>
	);
};

export const SendInviteButton = () => {
	// TODO: handle onClick
	return (
		<ActionButton
			label="send invite"
			onClick={() => toast.success('resend invite')}
			bgColor="bg-blue-500"
		/>
	);
};

interface RemoveButtonProps {
	label?: string;
	onClick: () => void;
}

export const RemoveButton = ({ label, onClick }: RemoveButtonProps) => {
	return (
		<ActionButton
			label={label ?? 'remove user from tournament'}
			onClick={onClick}
			bgColor="bg-red-500"
		/>
	);
};
