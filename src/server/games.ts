import { db } from "@/firebase";
import { Game } from "@/types/game";
import { collection, getDocs, query } from "firebase/firestore";

//wrapper for firebase db - returns array of games
export async function getGames() {
  console.log("getting games");

  let games: Game[] = [];

  const invitesCollection = collection(db, "games");
  const invitesQuery = query(invitesCollection);
  const querySnapshot = await getDocs(invitesQuery);

  querySnapshot.forEach((doc) => {
    games.push(doc.data() as Game);
  });

  return games;
}
