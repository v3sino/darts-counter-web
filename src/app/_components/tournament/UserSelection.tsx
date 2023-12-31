import { db } from '@/firebase';
import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { ActionButton, RemoveButton } from './ActionButton';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from '../LoadingSpinner';
import toast from 'react-hot-toast';
import { firebaseFetchOptions } from '@/app/_hooks/tournament';

export const UserSelection = ({ tournamentId }: { tournamentId: string }) => {
	// TODO: fetch just these not already in tournament?
	const [options, loading, error] = useCollection(
		collection(db, 'users'),
		firebaseFetchOptions
	);
	const [selectedUser, setSelectedUser] = useState('');

	useEffect(() => {
		if (options && options.docs.length > 0) {
			setSelectedUser(options.docs[0].id);
		}
	}, [options]);

	const onAddClick = async () => {
		const response = await fetch(`/api/tournaments/${tournamentId}`, {
			method: 'PUT',
			body: JSON.stringify({ records: [selectedUser] })
		});

		if (response.ok) {
			toast.success(`User added`, { duration: 2000 });
		} else if (response.status == 409) {
			var jsonRes = await response.json();
			toast.error(`Cannot add: ${jsonRes.message}`);
		} else {
			toast.error(`Error fetching data: ${response.statusText}`);
		}
	};

	if (error) {
		throw Error('Data not found');
	}

	if (loading) {
		return <LoadingSpinner />;
	}

	return (
		<div className="mt-2 flex items-center">
			<select
				onChange={e => setSelectedUser(e.target.value)}
				name="user"
				id="user"
				className='className="block sm:leading-6" w-fit rounded-md border-0 bg-white/5 p-2 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm'
			>
				{options?.docs.map(doc => {
					return (
						<option key={doc.id} value={doc.id}>
							{doc.data().username} (#{doc.data().inviteHash})
						</option>
					);
				})}
			</select>
			<span className="ml-4">
				<ActionButton
					label={'Add user to tournament'}
					onClick={onAddClick}
					bgColor={'bg-blue-400'}
				/>
			</span>
			{/* <span className="ml-4">
				<RemoveButton
					onClick={() => {
						toast.error('Not implemneted yet');
					}}
				/>
			</span> */}
		</div>
	);
};
