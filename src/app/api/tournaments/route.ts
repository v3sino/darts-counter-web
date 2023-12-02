import { db } from "@/firebase";
import { TournamentCreateSchema } from "@/types/tournament";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { NextRequest } from "next/server";
import { z } from "zod";

// gets all tournaments
export async function GET() {
    // TODO: implement
    console.log('getting tournaments');
}

// creates a new tournament
export const POST = async (request: NextRequest) => {
  try {

		const data = await request.json();

    if (data.startAt && typeof data.startAt === 'string') {
      data.startAt = new Date(data.startAt);
    }

		const parsedTournament = TournamentCreateSchema.parse(data);

    data.startAt = Timestamp.fromDate(data.startAt);

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