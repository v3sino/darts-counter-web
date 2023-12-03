import { db } from '@/firebase';
import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { ActionButton } from './ActionButton';
import { useState } from 'react';
import { LoadingSpinner } from '../LoadingSpinner';

export const UserSelection = () => {
	const [options, loading, error] = useCollection(collection(db, 'users'), {
		snapshotListenOptions: { includeMetadataChanges: true }
	});
	const [selectedUser, setSelectedUser] = useState('');

	const onClick = () => {
		console.log(selectedUser);
	};

	if (error) {
		throw Error('Data not found');
	}

	if (loading) {
		return <LoadingSpinner />;
	}

	return (
		<div className="mt-2">
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
					onClick={onClick}
					bgColor={'bg-blue-400'}
				/>
			</span>
		</div>
	);
};
