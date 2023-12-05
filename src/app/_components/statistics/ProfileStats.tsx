import { calculatePlayerStatistics, getGamesOfUser } from '@/server/games';
import { Game } from '@/types/game';
import Metric from './Metric';
import { FaBullseye, FaGlobe, FaFireAlt, FaCrosshairs } from 'react-icons/fa';
import AvgChart from './averagesChart';

type profileStatsProps = {
	uid: string;
};

const ProfileStats = async ({ uid }: profileStatsProps) => {
	const games: Game[] = await getGamesOfUser(uid);
	const stats = calculatePlayerStatistics(games, uid);

	return (
        <>
		<div className="flex flex-col flex-wrap sm:flex-row">
			<Metric value={games.length} label="games played">
				<FaGlobe className="h-12 w-12" />
			</Metric>
			<Metric value={stats.thrown180} label="total 180s thrown">
				<FaFireAlt className="h-12 w-12" />
			</Metric>
			<Metric
				value={
					stats.checkoutsHit === 0
						? 0.0
						: stats.checkoutsHit / stats.checkoutsPossible
				}
				label="checkout success rate"
			>
				<FaBullseye className="h-12 w-12" />
			</Metric>
			<Metric value={stats.tonPlusCheckouts} label="total 100+ checkouts">
				<FaCrosshairs className="h-12 w-12" />
			</Metric>
		</div>
        <div className="flex flex-col items-center pt-8">
            <h2 className="text-blue-200 text-2xl text-center">Your averages in last 10 games</h2>
            <AvgChart averages={stats.averages}></AvgChart>
        </div>
      </>
	);
};

export default ProfileStats;
