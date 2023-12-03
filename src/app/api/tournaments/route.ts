import { db } from "@/firebase";
import { TournamentCreateSchema } from "@/types/tournament";
import { Timestamp, addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { NextRequest } from "next/server";
import { z } from "zod";

// creates a new tournament
export const POST = async (request: NextRequest) => {
  // TODO: move to server?
  try {

	const data = await request.json();

	const parsedTournament = TournamentCreateSchema.parse(data);

    data.startAt = Timestamp.fromDate(new Date(data.startAt));

    await addDoc(collection(db, "tournaments"), data);

		return Response.json(parsedTournament, {
			status: 201
		});
	} catch (error) {
		if (error instanceof z.ZodError) {
      console.log(error);
			return Response.json({ errors: error.errors }, { status: 400 });
		} else {
			return Response.json({ message: 'Unexpected error' }, { status: 500 });
		}
	}
}