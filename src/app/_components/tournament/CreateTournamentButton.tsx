import Link from 'next/link';

export const CreateTournamentButton = () => (
	<Link
		href={'/tournaments/create'}
		className="rounded-md bg-white px-6 py-3 font-semibold text-black shadow hover:bg-gray-100"
	>
		Create a Tournament
	</Link>
);
