import { db } from "@/firebase";
import { TournamentUpdateSchema } from "@/types/tournament";
import { arrayUnion, deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { z } from "zod";

// get tournament by ID
export const GET = async (_: Request, { params: { id } }: { params: { id: string } }) => {
  // TODO: move to server?

  // TODO: implement
  // const q = query(doc(db, "tournaments", id));
  // const querySnapshot = await getDocs(doc(db, "tournaments", id));
  // const tournaments = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return Response.json([]);
}

export const DELETE = async (_: Request, { params: { id } }: { params: { id: string } }) => {
  // TODO: move to server?

  const res = await deleteDoc(doc(db, "tournaments", id));

  return Response.json(
		{
			message: 'Tournament deleted successfully'
		},
		{
			status: 200
		}
	);
}

export const PUT = async (request: Request, { params: { id } }: { params: { id: string } }) => {
  // TODO: move to server?
  try {
    const data = await request.json();
    console.log('dataa', data);
    // const parsedTournament = TournamentUpdateSchema.parse(data);
    const parsedTournament = data;
    console.log('parsedTournament', parsedTournament);

    const tournamentRef = doc(db, 'tournaments', id);

    // TODO: move to server as getDoc()
    const docSnap = await getDoc(tournamentRef);
    // check existence - docSnapexists()
    const fetchedTrounament = TournamentUpdateSchema.parse(docSnap.data());


    console.log(parsedTournament);
    parsedTournament.records?.map((record: string) => {
      fetchedTrounament.records?.push(record);
    });


    setDoc(tournamentRef, fetchedTrounament, { merge: true });
    // updateDoc(tournamentRef, {records: arrayUnion(records: parsedTournament.records?[0])}, { merge: true });

    return Response.json(
      {
        message: 'Tournament updated successfully'
      },
      {
        status: 200
      }
      );
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log(error);
        return Response.json({ errors: error.errors }, { status: 400 });
      } else {
        return Response.json({ message: 'Unexpected error' }, { status: 500 });
      }
    }
}
