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
			<button className="rounded-md bg-white px-6 py-3 font-semibold text-blue-400 shadow hover:bg-gray-100">
				Create a Tournament
			</button>
		</div>
	</div>
);
