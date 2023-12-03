'use client';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { RemoveButton } from './ActionButton';

export const DeleteTournamentButton = ({ id }: { id: string }) => {
	const router = useRouter();

	const onClick = async () => {
		const response = await fetch(`/api/tournaments/${id}`, {
			method: 'DELETE'
		});

		if (response.ok) {
			toast.success('Tournament successfully deleted');
			router.back();
		} else {
			toast.error('Tournament could not be deleted');
		}
	};

	return <RemoveButton onClick={onClick} label="Delete tournament" />;
};
