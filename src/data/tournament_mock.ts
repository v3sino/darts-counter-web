import { Tournament, TournamentRecord, TournamentRecordStatus } from "@/types/tournament";
import { Timestamp } from "firebase/firestore";

export const empty_tournament_list: Tournament[] = [];
export const demo_tournament_list: Tournament[] = [
    {
        id: '1',
        name: 'Demo tournament',
        organizedByUID: 'KafQzU4m5IhPPQDEuDjGgrCf7MC3',
        location: 'Brno',
        startAt: new Date(),
    },
    {
        id: '2',
        name: 'Demo tournament in very past',
        organizedByUID: 'KafQzU4m5IhPPQDEuDjGgrCf7MC3',
        location: 'Brno',
        startAt: new Date(23, 5, 24),
    },
    {
        id: '3',
        name: 'Demo tournament in future',
        organizedByUID: 'KafQzU4m5IhPPQDEuDjGgrCf7MC3',
        location: 'Brno',
        startAt: new Date(2023, 12, 31),
    }
];

export const empty_tournament: TournamentRecord[] = [];
export const demo_tournament: TournamentRecord[] = [
    {
        id: 'a',
        uid: 'KafQzU4m5IhPPQDEuDjGgrCf7MC3',
        username: 'betusin',
        userHash: 'Kaf674',
        status: TournamentRecordStatus.Sent,
        statusTimestamp: Timestamp.now()
    },
    {
        id: 'b',
        uid: 'KafQzU4m5IhPPQDEuDjGgrCf7MC3',
        username: 'betusin',
        userHash: 'Kaf674',
        status: TournamentRecordStatus.NotInvitedYet
    },
    {
        id: 'c',
        uid: 'KafQzU4m5IhPPQDEuDjGgrCf7MC3',
        username: 'betusin',
        userHash: 'Kaf674',
        status: TournamentRecordStatus.Accepted,
        statusTimestamp: Timestamp.now()
    },
    {
        id: 'c',
        uid: 'KafQzU4m5IhPPQDEuDjGgrCf7MC3',
        username: 'betusin',
        userHash: 'Kaf674',
        status: TournamentRecordStatus.Rejected,
        statusTimestamp: Timestamp.now()
    }
];