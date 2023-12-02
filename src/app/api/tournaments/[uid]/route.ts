import { db } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

// gets all tournaments
export const GET = async (_: Request, { params: { uid } }: { params: { uid: string } }) => {
  // TODO: move to server?
  if (!uid) {
    return Response.json({ error: 'UID is required' }, { status: 400 });
  }

  const q = query(collection(db, "tournaments"), where("organizedByUID", "==", uid));
  const querySnapshot = await getDocs(q);
  const tournaments = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return Response.json(tournaments);
}
