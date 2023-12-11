import { DocumentSnapshot, Timestamp } from "firebase/firestore"
import { z } from "zod"

export enum InviteStatus {
    Rejected = "rejected",
    Accepted = "accepted",
    NotInvitedYet = "not invited yet",
    Pending = "pending"
}

export type Invite = {
    id: string,
    inviteFrom: string,
    inviteFromUID: string,
    inviteTo: string,
    inviteToUID: string,
    status: InviteStatus,
    validUntil: Date
}

export const InviteCreateSchema = z.object({
    inviteFromUID: z.string().min(1),
    inviteToUID: z.string().min(1),
});

export type InviteCreate = z.infer<typeof InviteCreateSchema>;

function convertToInviteStatus(statusString: string): InviteStatus {
    if (Object.values(InviteStatus).includes(statusString as InviteStatus)) {
        return statusString as InviteStatus;
    }
    return InviteStatus.NotInvitedYet;
}

export const inviteConverter = {
    toFirestore: (invite: Invite) => {
        return {
            inviteFrom: invite.inviteFrom,
            inviteFromUID: invite.inviteFromUID,
            inviteTo: invite.inviteTo,
            inviteToUID: invite.inviteToUID,
            status: invite.status,
            validUntil: Timestamp.fromDate(invite.validUntil)
        };
    },
    fromFirestore: (snapshot: DocumentSnapshot) => {
        const data = snapshot.data();
        return {
            id: snapshot.id,
            inviteFrom: data?.inviteFrom,
            inviteFromUID: data?.inviteFromUID,
            inviteTo: data?.inviteTo,
            inviteToUID: data?.inviteToUID,
            status: convertToInviteStatus(data?.status),
            validUntil: new Date(data?.validUntil.seconds * 1000),
        };
    }
};

export const createInviteToFirestore = (inviteCreate: InviteCreate, inviteFrom: string, inviteTo: string): any => {
    var date = new Date();
    date.setHours(date.getHours() + 12);

    var invite: Invite = {
        id: "random",
        inviteFrom: inviteFrom,
        inviteFromUID: inviteCreate.inviteFromUID,
        inviteTo: inviteTo,
        inviteToUID: inviteCreate.inviteToUID,
        status: InviteStatus.Pending,
        validUntil: date,
    }
    return inviteConverter.toFirestore(invite);
}