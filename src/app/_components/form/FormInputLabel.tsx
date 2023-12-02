import React from 'react';

interface FormInputLabelProps {
	label: string;
	name: string;
}

const FormInputLabel = ({ label, name }: FormInputLabelProps) => {
	return (
		<label
			htmlFor={name}
			className="block text-sm font-medium leading-6 text-white"
		>
			{label}
		</label>
	);
};

export default FormInputLabel;
