import { db } from "@/firebase";
import { convertToTournament, convertToTournamentRecord } from "@/types/tournament";
import { doc, getDoc } from "firebase/firestore";

type idProps = {
  id: string
}


// TODO: converted return data should be in some facade or so, here just basic calls to firebase


export async function getTournamentById({ id }: idProps) {
  console.log("getting tournament by ID");

  const docSnap = await getDoc(doc(db, "tournaments", id));
  if (docSnap.exists()) {
    return docSnap.data();
  }
}

export async function getConvertedTournamentById({ id }: idProps) {
  console.log("getting tournament by ID");

  const docSnap = await getDoc(doc(db, "tournaments", id));
  if (docSnap.exists()) {
    // TODO: convert?
    return convertToTournament(docSnap.data(), docSnap.id);
  }
}



export async function getRecordByUID({ id }: idProps) {
  console.log("getting tournament by ID");

  const docSnap = await getDoc(doc(db, "users", id));
  if (docSnap.exists()) {
    // TODO: convert?
    return convertToTournamentRecord(docSnap.data(), id);
  }
  throw new Error(`Document with ID ${id} does not exist`);
}