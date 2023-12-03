import { db } from "@/firebase";
import { deleteDoc, doc } from "firebase/firestore";

// get tournament by ID
export const GET = async (_: Request, { params: { id } }: { params: { id: string } }) => {
  // TODO: move to server?

  // TODO: implement
  // const q = query(doc(db, "tournaments", id));
  // const querySnapshot = await getDocs(doc(db, "tournaments", id));
  // const tournaments = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return Response.json([]);
}

export const DELETE = async (_: Request, { params: { id } }: { params: { id: string } }) => {
  // TODO: move to server?

  const res = await deleteDoc(doc(db, "tournaments", id));

  return Response.json(
		{
			message: 'Tournament deleted successfully'
		},
		{
			status: 200
		}
	);
}
