'use client';

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
			onClick={() => console.log('resend invite')}
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
			onClick={() => console.log('resend invite')}
			bgColor="bg-blue-500"
		/>
	);
};

export const RemoveButton = () => {
	// TODO: handle onClick
	return (
		<ActionButton
			label="remove user from tournament"
			onClick={() => console.log('resend invite')}
			bgColor="bg-red-500"
		/>
	);
};
