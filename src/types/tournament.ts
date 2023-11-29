import { Timestamp } from "firebase/firestore"

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
}