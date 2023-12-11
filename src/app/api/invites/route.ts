import { db } from "@/firebase";
import { getInviteHashFromUID } from "@/server/users";
import { InviteCreateSchema, createInviteToFirestore } from "@/types/invite";
import { addDoc, collection } from "firebase/firestore";
import { NextRequest } from "next/server";
import { z } from "zod";

export const POST = async (request: NextRequest) => {
    // TODO: move to server?
    try {
        const data = await request.json();
        const parsedInvite = InviteCreateSchema.parse(data);

        const inviteFrom = await getInviteHashFromUID(parsedInvite.inviteFromUID);
        const inviteTo = await getInviteHashFromUID(parsedInvite.inviteToUID);
        await addDoc(collection(db, "invites"), createInviteToFirestore(parsedInvite, inviteFrom, inviteTo));

        return Response.json(parsedInvite, {
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