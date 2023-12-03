import { Timestamp } from "firebase/firestore"
import { string, z } from "zod"

export enum TournamentStatus {
    Rejected = "rejected",
    Accepted = "accepted",
    NotInvitedYet = "not invited yet",
    Sent = "sent"
}

export type TournamentRecord = {
    uid: string,
    username: string,
    inviteHash: string,
    status: TournamentStatus,
    statusTimestamp?: Timestamp,
}

export type Tournament = {
    id: string,
    name: string,
    organizedByUID: string,
    location: string,
    startAt: Date,
    records: string[],
}

//TODO: use converter instead with classes? https://firebase.google.com/docs/firestore/manage-data/add-data#custom_objects

export function convertToTournament(docData: any, docId: string): Tournament {
    if (!docData || typeof docData !== 'object') {
        throw new Error('Invalid document data');
    }

    return {
        id: docId,
        name: docData.name ?? '',
        organizedByUID: docData.organizedByUID ?? '',
        location: docData.location ?? '',
        startAt: docData.startAt instanceof Timestamp ? docData.startAt.toDate() : new Date(),
        records: Array.isArray(docData.records) ? docData.records : [],
    };
}

function getTournamentStatus(statusString: string): TournamentStatus {
    if (Object.values(TournamentStatus).includes(statusString as TournamentStatus)) {
        return statusString as TournamentStatus;
    }
    return TournamentStatus.NotInvitedYet
}

export function convertToTournamentRecord(docData: any, uid: string): TournamentRecord {
    if (!docData || typeof docData !== 'object') {
        throw new Error('Invalid document data');
    }

    return {
        uid: uid,
        username: docData.username ?? '',
        inviteHash: docData.inviteHash ?? '',
        status: getTournamentStatus(docData.status),
        statusTimestamp: docData.startAt instanceof Timestamp ? docData.startAt.toDate() : new Date(),
    };
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