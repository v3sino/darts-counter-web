import { Timestamp } from "firebase/firestore"
import { z } from "zod"

export enum InviteStatus {
    Rejected = "rejected",
    Accepted = "accepted",
    NotInvitedYet = "not invited yet",
    Pending = "pending"
}

export type Invite = {
    inviteFrom: string,
    inviteFromUID: string,
    inviteTo: string,
    inviteToUID: string,
    status: InviteStatus,
    validUntil: Timestamp
}

export const InviteCreateSchema = z.object({
    inviteFromUID: z.string().min(1),
    inviteToUID: z.string().min(1),
});

export type InviteCreate = z.infer<typeof InviteCreateSchema>;

export const createInvite = (inviteCreate: InviteCreate, inviteFrom: string, inviteTo: string): Invite => {
    var date = new Date();
    date.setHours(date.getHours() + 12);

    var invite: Invite = {
        inviteFrom: inviteFrom,
        inviteFromUID: inviteCreate.inviteFromUID,
        inviteTo: inviteTo,
        inviteToUID: inviteCreate.inviteToUID,
        status: InviteStatus.Pending,
        validUntil: Timestamp.fromDate(date),
    }
    return invite;
}