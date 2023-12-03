import { db } from "@/firebase";
import { getTournamentById } from "@/server/tournaments";
import { TournamentUpdateSchema } from "@/types/tournament";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { z } from "zod";

// get tournament by ID
export const GET = async (_: Request, { params: { id } }: { params: { id: string } }) => {
  const fetchedTrounament = await getTournamentById({id: id});

  return Response.json(fetchedTrounament,
		{
			status: 200
		}
	);
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
    const fetchedTrounament = TournamentUpdateSchema.parse(await getTournamentById({id: id}));

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
