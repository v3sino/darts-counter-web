import { db } from '@/firebase';
import { Invite, InviteStatus, inviteConverter } from '@/types/invite';
import { Tournament, TournamentRecord } from '@/types/tournament';
import {
	DocumentData,
	DocumentSnapshot,
	Timestamp,
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	where
} from 'firebase/firestore';
import { getUsernameFromUID } from './users';

type idProps = {
	id: string;
};

export async function getTournamentById({ id }: idProps) {
	console.log(`getting tournament by ID ${id}`);

	const docSnap = await getDoc(doc(db, 'tournaments', id));
	if (docSnap.exists()) {
		return docSnap.data();
	}
}

// TODO: use converter instead with classes? https://firebase.google.com/docs/firestore/manage-data/add-data#custom_objects
// TODO: move to convert or so?

export async function convertToTournament(
	doc: DocumentSnapshot<DocumentData, DocumentData> | undefined
): Promise<Tournament> {
	const docData = doc?.data();
	if (!doc?.exists || !docData || typeof docData !== 'object') {
		throw new Error('Invalid document data');
	}

	const fetchedRecords: TournamentRecord[] = [];
	const invites = [];

	if (Array.isArray(docData.records)) {
		for (let i = 0; i < docData.records.length; i++) {
			for (let j = i + 1; j < docData.records.length; j++) {
				const fromUID = docData.records[i];
				const toUID = docData.records[j];

				if (fromUID.length !== 0 && toUID.length !== 0) {
					const invite = await fetchInvite(fromUID, toUID);
					invites.push(invite);
				}
			}
		}
	}

	return {
		id: doc?.id ?? '',
		name: docData.name ?? '',
		organizedByUID: docData.organizedByUID ?? '',
		location: docData.location ?? '',
		startAt:
			docData.startAt instanceof Timestamp
				? new Date(docData.startAt.seconds * 1000)
				: new Date(),
		records: fetchedRecords,
		invites: invites
	};
}

async function fetchInvite(fromUID: string, toUID: string): Promise<Invite> {
	const invitesRef = collection(db, 'invites');
	const q = query(
		invitesRef,
		where('inviteFromUID', '==', fromUID),
		where('inviteToUID', '==', toUID)
	);
	const querySnapshot = await getDocs(q);

	var invite;

	querySnapshot.forEach(doc => {
		invite = inviteConverter.fromFirestore(doc);
	});

	if (invite === undefined) {
		// TODO(betka): validUntil?
		invite = {
			id: 'something',
			inviteFrom: await getUsernameFromUID(fromUID),
			inviteFromUID: fromUID,
			inviteTo: await getUsernameFromUID(toUID),
			inviteToUID: toUID,
			status: InviteStatus.NotInvitedYet,
			validUntil: new Date()
		};
	}

	return invite;
}

// TODO(betka): remove this by using converter
export async function remapResponseWithStartAt(response: Response) {
	const fetchedTournaments = await response.json();

	fetchedTournaments.map((tournament: { startAt: any }) => {
		if (tournament.startAt && typeof tournament.startAt.seconds === 'number') {
			tournament.startAt = new Date(tournament.startAt.seconds * 1000);
		}
	});
	return fetchedTournaments;
}
