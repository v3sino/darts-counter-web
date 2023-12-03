import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

export const getInviteHashFromUID = async (uid: string) => {
    const docSnap = await getDoc(doc(db, "users", uid));
  if (docSnap.exists()) {
    return docSnap.data().inviteHash;
  }
}