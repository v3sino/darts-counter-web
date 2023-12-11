import { db } from "@/firebase";
import { Invite, InviteStatus, inviteConverter } from "@/types/invite";
import { Tournament, TournamentRecord, TournamentRecordStatus } from "@/types/tournament";
import { DocumentData, Query, QuerySnapshot, Timestamp, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

type idProps = {
  id: string
}

export async function getTournamentById({ id }: idProps) {
  console.log(`getting tournament by ID ${id}`);

  const docSnap = await getDoc(doc(db, "tournaments", id));
  if (docSnap.exists()) {
    return docSnap.data();
  }
}

export function getQueryInvitesFrom(inviteFromUID: string): Query<DocumentData, DocumentData> {
  const invitesRef = collection(db, 'invites');
  const q = query(invitesRef, where('inviteFromUID', '==', inviteFromUID));
  return q;
}

async function getRecordByUID(uid: string, invitesCollection:  QuerySnapshot<DocumentData, DocumentData>) {
  console.log(`getting tournament by UID ${uid}`);

  const userDocSnap = await getDoc(doc(db, "users", uid));
  if (userDocSnap.exists()) {
    var inviteTo = userDocSnap.id;
    var userDocData = userDocSnap.data();
    userDocData.status = TournamentRecordStatus.NotInvitedYet;

    if (invitesCollection != null) {
      invitesCollection.docs.map(inviteDoc => {
        if (inviteTo === inviteDoc.data().inviteToUID) {
          userDocData.status = inviteDoc.data().status;
        }
      });
    }
    return convertToTournamentRecord(userDocData, uid);
  }
  throw new Error(`Document with ID ${uid} does not exist`);
}

// TODO: use converter instead with classes? https://firebase.google.com/docs/firestore/manage-data/add-data#custom_objects
// TODO: move to convert or so?

export async function convertToTournament(docData: DocumentData | undefined, docId: string, invitesCollection:  QuerySnapshot<DocumentData, DocumentData>): Promise<Tournament> {
  if (!docData || typeof docData !== 'object') {
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
          console.log(fromUID, toUID);
          try {
            const invite = await fetchInvite(fromUID, toUID);
            invites.push(invite);
          } catch (error) {
            console.error('Error fetching record:', error);
          }
        }
      }
    }
  }

  return {
    id: docId,
    name: docData.name ?? '',
    organizedByUID: docData.organizedByUID ?? '',
    location: docData.location ?? '',
    startAt: docData.startAt instanceof Timestamp ? new Date(docData.startAt.seconds * 1000) : new Date(),
    records: fetchedRecords,
    invites: invites,
  };
}

async function fetchInvite(fromUID: string, toUID: string): Promise<Invite> {
  const invitesRef = collection(db, 'invites');
  const q = query(invitesRef, where('inviteFromUID', '==', fromUID), where('inviteToUID', '==', toUID));
  const querySnapshot = await getDocs(q);

  var invite;

  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    invite = inviteConverter.fromFirestore(doc);
  });

  if (invite === undefined) {
    // TODO(betka): not UID everywhere
    // TODO(betka): validUntil?
    invite = {
      id: "something",
      inviteFrom: fromUID,
      inviteFromUID: fromUID,
      inviteTo: toUID,
      inviteToUID: toUID,
      status: InviteStatus.NotInvitedYet,
      validUntil: new Date(),
    };
  }

  return invite;
}

function convertTournamentRecordStatus(statusString: string): TournamentRecordStatus {
  if (Object.values(TournamentRecordStatus).includes(statusString as TournamentRecordStatus)) {
    return statusString as TournamentRecordStatus;
  }
  return TournamentRecordStatus.NotInvitedYet;
}

export function convertToTournamentRecord(docData: any, uid: string): TournamentRecord {
  if (!docData || typeof docData !== 'object') {
    throw new Error('Invalid document data');
  }

  return {
    uid: uid,
    username: docData.username ?? '',
    inviteHash: docData.inviteHash ?? '',
    status: convertTournamentRecordStatus(docData.status),
    // statusTimestamp: docData.startAt instanceof Timestamp ? docData.startAt.toDate() : new Date(),
  };
}

export async function remapResponseWithStartAt(response: Response) {
  const fetchedTournaments = await response.json();

  fetchedTournaments.map((tournament: { startAt: any }) => {
    if (
      tournament.startAt &&
      typeof tournament.startAt.seconds === 'number'
    ) {
      tournament.startAt = new Date(tournament.startAt.seconds * 1000);
    }
  });
  return fetchedTournaments;
}