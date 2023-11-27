import { db } from "@/firebase";
import { Game } from "@/types/game";
import { collection, getDocs, query } from "firebase/firestore";

//wrapper for firebase db - DO NOT USE THIS -> use function getGames() in /server
//ONLY POST/PUT/DELETE should be handled this way via endpoint - keeping this just to use in future
export async function GET() {
  const invitesCollection = collection(db, "games");
  const invitesQuery = query(invitesCollection);
  const querySnapshot = await getDocs(invitesQuery);

  console.log("getting games");

  let games: Game[] = [];

  querySnapshot.forEach((doc) => {
    games.push(doc.data() as Game);
  });

  return Response.json({ games });
}
