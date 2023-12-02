import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface FormInputFieldProps {
	name: string;
	type?: string;
	register: UseFormRegister<any>;
	required?: boolean;
	defaultValue?: string;
}

const FormInputField = ({
	name,
	type = 'text',
	register,
	required = false,
	defaultValue = ''
}: FormInputFieldProps) => {
	return (
		<div className="mt-2">
			<input
				id={name}
				type={type}
				defaultValue={defaultValue}
				{...register(name, { required })}
				className="block w-full rounded-md border-0 bg-white/5 p-2 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
			/>
		</div>
	);
};

export default FormInputField;
