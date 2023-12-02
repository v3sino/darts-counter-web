import React from 'react';

interface SubmitButtonProps {
	isSubmitting: boolean;
	text: string;
	waitingText: string;
}

const SubmitButton = ({
	isSubmitting,
	text,
	waitingText
}: SubmitButtonProps) => {
	return (
		<div>
			<button
				type="submit"
				disabled={isSubmitting}
				className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-40"
			>
				{isSubmitting ? waitingText : text}
			</button>
		</div>
	);
};

export default SubmitButton;
