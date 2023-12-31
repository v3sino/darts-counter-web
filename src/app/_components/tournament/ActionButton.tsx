'use client';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import toast from 'react-hot-toast';

interface ActionButtonProps {
	label: string;
	onClick?: () => void;
	bgColor: string;
	textColor?: string;
	type?: 'button' | 'submit' | 'reset' | undefined;
	icon?: IconProp;
}

export const ActionButton = ({
	label,
	onClick,
	bgColor,
	textColor,
	type,
	icon
}: ActionButtonProps) => {
	return (
		<button
			type={type}
			onClick={onClick}
			className={`rounded px-4 py-2 ${textColor ?? 'text-white'} ${bgColor}`}
		>
			{icon !== undefined && <FontAwesomeIcon icon={icon} className="mr-2" />}
			{label}
		</button>
	);
};

// TODO: probably needed to pass some arguments to handle onClick
interface SpecificActionButtonProps {
	inviteFromUID: string;
	inviteToUID: string;
}

const onSendInvite = async (inviteData: SpecificActionButtonProps) => {
	const response = await fetch(`/api/invites`, {
		method: 'POST',
		body: JSON.stringify(inviteData)
	});
	if (response.ok) {
		toast.success('Invite sucessfully sent');
	} else {
		toast.error(`Error fetching data: ${response.statusText}`);
	}
};

export const SendInviteButton = ({
	inviteData,
	label
}: {
	inviteData: SpecificActionButtonProps;
	label?: string;
}) => {
	return (
		<ActionButton
			label={label ?? 'send invite'}
			onClick={() => onSendInvite(inviteData)}
			bgColor="bg-blue-400"
			textColor="text-white"
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
			icon={faTrashAlt}
			label={label ?? 'Remove user from tournament'}
			onClick={onClick}
			bgColor="bg-red-500"
		/>
	);
};
