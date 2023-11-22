import { db } from "@/firebase";
import { collection, getDocs, query } from "firebase/firestore";

export default async function Home() {
  const invitesCollection = collection(db, "invites");
  const invitesQuery = query(invitesCollection);
  const querySnapshot = await getDocs(invitesQuery);
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
  });

  return (
    <main>
      <div className="flex h-screen">
        <h1>Main page with info about app</h1>
      </div>
    </main>
  );
}
