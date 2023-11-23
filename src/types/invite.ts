import { Timestamp } from "firebase/firestore"

export type Invite = {
    inviteFrom: string,
    inviteFromUID: string,
    inviteTo: string,
    inviteToUID: string,
    status: string,
    validUntil: Timestamp
}