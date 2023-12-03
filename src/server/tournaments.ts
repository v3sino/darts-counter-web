import { db } from "@/firebase";
import { Tournament, TournamentRecord, TournamentStatus } from "@/types/tournament";
import { Timestamp, doc, getDoc } from "firebase/firestore";

type idProps = {
  id: string
}

export async function getTournamentById({ id }: idProps) {
  console.log("getting tournament by ID");

  const docSnap = await getDoc(doc(db, "tournaments", id));
  if (docSnap.exists()) {
    return docSnap.data();
  }
}

export async function getConvertedTournamentById({ id }: idProps) {
  console.log("getting converted tournament by ID");

  const docSnap = await getDoc(doc(db, "tournaments", id));
  if (docSnap.exists()) {
    return await convertToTournament(docSnap.data(), docSnap.id);
  }
}



export async function getRecordByUID({ id }: idProps) {
  console.log("getting tournament by UID");

  const docSnap = await getDoc(doc(db, "users", id));
  if (docSnap.exists()) {
    return convertToTournamentRecord(docSnap.data(), id);
  }
  throw new Error(`Document with ID ${id} does not exist`);
}

// TODO: use converter instead with classes? https://firebase.google.com/docs/firestore/manage-data/add-data#custom_objects
// TODO: move to convert or so?

export async function convertToTournament(docData: any, docId: string): Promise<Tournament> {
  if (!docData || typeof docData !== 'object') {
    throw new Error('Invalid document data');
  }

  const fetchedRecords = [];

  if (Array.isArray(docData.records)) {
    for (const record of docData.records) {
      try {
        if (record.length !== 0) {
            const tournamentRecord = await getRecordByUID({ id: record });
            fetchedRecords.push(tournamentRecord);
        }
      } catch (error) {
          console.error('Error fetching record:', error);
      }
    }
  }

  return {
    id: docId,
    name: docData.name ?? '',
    organizedByUID: docData.organizedByUID ?? '',
    location: docData.location ?? '',
    startAt: docData.startAt instanceof Timestamp ? docData.startAt.toDate() : new Date(),
    records: fetchedRecords,
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