import { TournamentTable } from '@/app/_components/tournament/TournamentTable';
import { demo_tournament } from '@/data/tournament_mock';

type TournamentPageProps = {
	params: {
		id: string;
	};
};

const TournamentPage = ({ params }: TournamentPageProps) => {
	// TODO: create custom hook
	// const { data, status } = useTournament();

	// if (status === 'pending') {
	// 	return <div>Loading tournament...</div>;
	// }

	// if (data === undefined) {
	// 	throw Error('Data not found');
	// }

	return (
		<div className="p-12">
			<TournamentTable tournaments={demo_tournament} />
		</div>
	);
};

export default TournamentPage;
