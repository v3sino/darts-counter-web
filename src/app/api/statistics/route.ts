import { db } from "@/firebase";
import { Game } from "@/types/game";
import { collection, getDocs, query } from "firebase/firestore";

//wrapper for firebase db - returns json array of games
//need to decide if statistics will be calculated here or at the page - if on page this endpoint should be renamed to games
export async function GET() {
    const invitesCollection = collection(db, "games");
    const invitesQuery = query(invitesCollection);
    const querySnapshot = await getDocs(invitesQuery);
    
    let games: Game[] = [];
    
    querySnapshot.forEach((doc) => {
        games.push(doc.data() as Game);
    });
    
    console.log(games);

    return Response.json({ games });
  }