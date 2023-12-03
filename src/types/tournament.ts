import { Timestamp } from "firebase/firestore"
import { string, z } from "zod"

export enum TournamentStatus {
    Rejected = "rejected",
    Accepted = "accepted",
    NotInvitedYet = "not invited yet",
    Sent = "sent"
}

export type TournamentRecord = {
    id: string,
    uid: string,
    username: string,
    userHash: string,
    status: TournamentStatus,
    statusTimestamp?: Timestamp,
}

export type Tournament = {
    id: string,
    name: string,
    organizedByUID: string,
    location: string,
    startAt: Date,
    records: TournamentRecord[],
}


export const TournamentSchema = z.object({
    name: string().min(1),
    location: string().min(1),
    startAt: string(),
});

export const TournamentCreateSchema = TournamentSchema.extend({
    organizedByUID: string().min(1),
});

export type TournamentCreate = z.infer<typeof TournamentCreateSchema>;


export const TournamentUpdateSchema = z.object({
    // name: z.string().min(1).optional(),
    // location: z.string().min(1).optional(),
    // startAt: z.string().min(1).optional(),
    records: z.array(z.string()).optional(),
});

export type TournamentUpdate = z.infer<typeof TournamentUpdateSchema>;