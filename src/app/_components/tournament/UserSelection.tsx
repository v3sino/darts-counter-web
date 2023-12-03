import { db } from '@/firebase';
import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ActionButton } from './ActionButton';
import { LoadingSpinner } from '../LoadingSpinner';
import toast from 'react-hot-toast';

type FormData = {
	uid: string;
};

export const UserSelection = ({ tournamentId }: { tournamentId: string }) => {
	// TODO: fetch just these not already in tournament?
	const [options, loading, error] = useCollection(collection(db, 'users'), {
		snapshotListenOptions: { includeMetadataChanges: true }
	});
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormData>();

	const onSubmit: SubmitHandler<FormData> = async data => {
		const response = await fetch(`/api/tournaments/${tournamentId}`, {
			method: 'PUT',
			body: JSON.stringify({ records: [data.uid] })
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
		<form onSubmit={handleSubmit(onSubmit)} className="mt-4">
			<select
				{...register('uid', { required: true })}
				name="user"
				id="user"
				className="w-fit rounded-md border-0 bg-white/5 p-2 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm"
				required
			>
				{options?.docs.map(doc => (
					<option key={doc.id} value={doc.id}>
						{doc.data().username} (#{doc.data().inviteHash})
					</option>
				))}
			</select>
			{errors.uid && <div>User is required</div>}
			<span className="ml-4">
				<ActionButton
					type="submit"
					label={'Add user to tournament'}
					bgColor={'bg-blue-400'}
					onClick={() => {}}
				/>
			</span>
		</form>
	);
};
