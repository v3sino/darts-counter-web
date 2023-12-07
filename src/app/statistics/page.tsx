import { calculateGamesLastWeek, calculateStatistics, getGames } from '@/server/games';
import { Game } from '@/types/game';
import Metric from '../_components/statistics/Metric';
import {
	FaBullseye,
	FaGlobe,
	FaFireAlt,
	FaCrosshairs,
} from 'react-icons/fa';
import GamesChart from '../_components/statistics/gamesChart';

export const revalidate = 3600;

export default async function Stats() {

	const games: Game[] = await getGames();
	const todayGames: Game[] = games.filter(
		g => g.startedAt.toDate().toDateString() === new Date().toDateString()
	);

	const stats = calculateStatistics(games);
	const todayStats = calculateStatistics(todayGames);

	const sum = stats.averages.reduce((a, b) => a + b, 0);
	const avg = sum / stats.averages.length || 0;

	return (
		<main>
			<div className="flex flex-col h-fit">
				<h1 className="pt-4 text-center text-4xl text-blue-200">
					Global app statistics
				</h1>
				<div className="flex flex-col flex-wrap sm:flex-row">
					<Metric value={games.length} label="total games played">
						<FaGlobe className="h-12 w-12" />
					</Metric>
					<Metric value={todayGames.length} label="games played today">
						<FaGlobe className="h-12 w-12 text-black" />
					</Metric>
					<Metric value={stats.thrown180} label="total 180s thrown">
						<FaFireAlt className="h-12 w-12" />
					</Metric>
					<Metric value={todayStats.thrown180} label="180s thrown today">
						<FaFireAlt className="h-12 w-12 text-black" />
					</Metric>
					<Metric
						value={stats.checkoutsHit / stats.checkoutsPossible}
						label="checkout success rate"
					>
						<FaBullseye className="h-12 w-12" />
					</Metric>
					<Metric value={avg} label="average average in all games">
						<FaBullseye className="h-12 w-12" />
					</Metric>
					<Metric value={stats.tonPlusCheckouts} label="total 100+ checkouts">
						<FaCrosshairs className="h-12 w-12" />
					</Metric>
					<Metric
						value={todayStats.tonPlusCheckouts}
						label="100+ checkouts today"
					>
						<FaCrosshairs className="h-12 w-12 text-black" />
					</Metric>
				</div>
        <div className="flex flex-col items-center pt-8">
          <h2 className="text-blue-200 text-2xl text-center">Games played in last 7 days</h2>
          <GamesChart gamesPlayed={calculateGamesLastWeek(games)}></GamesChart>
        </div>
			</div>
		</main>
	);
}
