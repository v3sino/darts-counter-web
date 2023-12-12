import { string, z } from 'zod';
import { Invite } from './invite';

export enum TournamentRecordStatus {
	Rejected = 'rejected',
	Accepted = 'accepted',
	NotInvitedYet = 'not invited yet',
	Pending = 'pending'
}

export type TournamentRecord = {
	uid: string;
	username: string;
	inviteHash: string;
	status: TournamentRecordStatus;
	// statusTimestamp?: Timestamp,
};

export type Tournament = {
	id: string;
	name: string;
	organizedByUID: string;
	location: string;
	startAt: Date;
	records: TournamentRecord[];
	invites: Invite[];
};

export const TournamentSchema = z.object({
	name: string().min(1),
	location: string().min(1),
	startAt: string()
});

export const TournamentCreateSchema = TournamentSchema.extend({
	organizedByUID: string().min(1)
});

export type TournamentCreate = z.infer<typeof TournamentCreateSchema>;

export const TournamentUpdateSchema = z.object({
	// name: z.string().min(1).optional(),
	// location: z.string().min(1).optional(),
	// startAt: z.string().min(1).optional(),
	records: z.array(z.string()).optional()
});

export type TournamentUpdate = z.infer<typeof TournamentUpdateSchema>;
