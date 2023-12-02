'use client';

import FormInputField from '@/app/_components/form/FormInputField';
import FormInputLabel from '@/app/_components/form/FormInputLabel';
import SubmitButton from '@/app/_components/form/SubmitButton';
import { TournamentCreate, TournamentSchema } from '@/types/tournament';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Datepicker from 'tailwind-datepicker-react';

export default function CreateTournamentPage() {
	const {
		control,
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<TournamentCreate>({ resolver: zodResolver(TournamentSchema) });
	const [show, setShow] = useState(false);

	const handleClose = (state: boolean) => {
		setShow(state);
	};

	const onSubmit = async (data: TournamentCreate) => {
		// TODO: get UID of current signed in user
		data.organizedByUID = 'KafQzU4m5IhPPQDEuDjGgrCf7MC3';

		const response = await fetch(`/api/tournaments`, {
			method: 'POST',
			body: JSON.stringify(data)
		});

		if (response.ok) {
			const fetchedData = await response.json();
			toast.success(
				`Tournament will be created: ${JSON.stringify(fetchedData)}`,
				{ duration: 2000 }
			);
		} else {
			toast.error(`Error fetching data: ${response.statusText}`);
		}
	};

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
					Create a new tournament
				</h2>
			</div>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<div className="space-y-6">
						<div className="mt-2">
							<FormInputLabel label="Tournament name" name="name" />
							<FormInputField
								name="name"
								defaultValue="Christmas Tournament"
								required
								register={register}
							/>
							{errors.name && (
								<span className="text-red-500">{errors.name?.message}</span>
							)}
						</div>

						<div className="mt-2">
							<FormInputLabel label="Location of tournament" name="location" />
							<FormInputField
								name="location"
								defaultValue="Brno"
								required
								register={register}
							/>
							{errors.location && (
								<span className="text-red-500">{errors.location?.message}</span>
							)}
						</div>

						<div className="mt-2">
							<FormInputLabel label="Start date" name="startAt" />
							<Controller
								control={control}
								name="startAt"
								render={({ field }) => (
									// TODO: opens way far from where clicked
									// TODO: cannot choose time
									// TODO: initial value
									<Datepicker
										onChange={date => field.onChange(date)}
										show={show}
										setShow={handleClose}
									/>
								)}
							/>
							{errors.startAt && (
								<span className="text-red-500">{errors.startAt?.message}</span>
							)}
						</div>

						<SubmitButton
							isSubmitting={isSubmitting}
							waitingText="Creating a tournament..."
							text="Create"
						/>
					</div>
				</div>
			</form>
		</div>
	);
}
