import { db } from '@/firebase';
import { Game } from '@/types/game';
import { Statistics } from '@/types/stats';
import { collection, getDocs, query } from 'firebase/firestore';

//wrapper for firebase db - returns array of games
export async function getGames() {
	let games: Game[] = [];

	const invitesCollection = collection(db, 'games');
	const invitesQuery = query(invitesCollection);
	const querySnapshot = await getDocs(invitesQuery);

	querySnapshot.forEach(doc => {
		games.push(doc.data() as Game);
	});

	return games;
}

export function calculateStatistics(games: Game[]) {
	const stats: Statistics = {
		thrown180: 0,
		thrown100: 0,
		tonPlusCheckouts: 0,
		checkoutsPossible: 0,
		checkoutsHit: 0,
		averages: []
	};

  games.forEach((game) => {
    calculateStatisticsForOneGame(deserializeVisits(game.gameState.visits[0]), stats);
    calculateStatisticsForOneGame(deserializeVisits(game.gameState.visits[1]), stats);
  });

	return stats;
}

function calculateStatisticsForOneGame(visits: Visit[], stats: Statistics) {
	const startingScore = 501;
	let overallScore = startingScore;
	let dartsThrown = 0;

	visits.forEach(visit => {
    if (visit.score.length === 0) return;

		visit.score.forEach(hit => {
			overallScore -= hit;
			if (oneDartCheckouts.includes(overallScore)) {
				stats.checkoutsPossible += 1;
			}
		});

		dartsThrown += visit.score.length;

		if (visit.isBusted) {
			overallScore += visit.score.reduce((sum, p) => sum + p);
			return;
		}

		let score = visit.score.reduce((sum, p) => sum + p);
		if (score == 180) stats.thrown180 += 1;
		if (score >= 100) stats.thrown100 += 1;
	});

	if (overallScore === 0) {
		stats.checkoutsHit += 1;
		if (visits.at(-1)!.score.reduce((sum, p) => sum + p) >= 100) {
			stats.tonPlusCheckouts += 1;
		}
	}

	stats.averages.push(
		getGameAverage(dartsThrown, startingScore - overallScore)
	);

	return stats;
}

type Visit = {
	score: Array<number>;
	isBusted: boolean;
};

function deserializeVisits(data: string[]) {
  let result: Visit[] = [];
  data.forEach((visitString) => {
    let parts = visitString.split(',');
	  let scores: number[] = [];
	  for (let i = 0; i < 3; i++) {
		  if (parts[i] == '') continue;
		  scores.push(Number(parts[i]));
	  }
	  let busted: boolean = parts[3] == 'true';
	  result.push({ score: scores, isBusted: busted } as Visit);
  });
	return result;
}

const oneDartCheckouts: number[] = [
	2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 50
];

function getGameAverage(dartsThrown: number, totalPointsThrown: number) {
	if (dartsThrown === 0) return 0.0;
	return (totalPointsThrown / dartsThrown) * 3;
}

export function calculateGamesLastWeek(games: Game[]){

  let gamesPlayed = [];
	const today = new Date();
	for (var i = 0; i < 7; i++) {
		let day = new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate() - i
		);
		let gamesThatDay = games.filter((g) => {return g.startedAt.toDate().toLocaleDateString() === day.toLocaleDateString()}).length;
    gamesPlayed.push(gamesThatDay);   
	}
	gamesPlayed.reverse();
  return gamesPlayed;
}
