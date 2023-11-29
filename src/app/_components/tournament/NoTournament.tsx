import { CreateTournamentButton } from './CreateTournamentButton';

export const NoTournament = () => (
	<div className="flex min-h-screen flex-col items-center justify-center">
		<div>
			<title>No Tournament</title>
			<meta name="description" content="Tournament Page" />
		</div>
		<div className="text-center">
			<h1 className="mb-8 text-5xl font-bold text-white">
				No tournament created yet
			</h1>
			<CreateTournamentButton />
		</div>
	</div>
);
