import { getGames } from "@/server/games";
import { Game } from "@/types/game";

//refresh this page on server every hour and serve it statically to users
export const revalidate = 3600;

export default async function Stats() {
  console.log("building");

  const games: Game[] = await getGames();

  //TODO calculate all interesting stats
  // - number of all users
  // - number of total games
  // - number of games played today ?
  // - average checkout of all games
  // - average checkout today
  // - average average of all games
  // - average average today
  // - total 180s hit

  //TODO nice styling of this page

  const numberOfGames = games.length;

  return (
    <main>
      <div className="flex flex-col h-screen">
        <h1>
          Page with global stats / graphs - should be rendered at server and
          somehow refreshed periodically
        </h1>
        <h1>Total games played: {numberOfGames}</h1>
      </div>
    </main>
  );
}
