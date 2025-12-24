import { getToken } from "firebase/messaging";
import { collection, addDoc } from "firebase/firestore";
import { messaging, db } from "../firebase";

export async function registerPushAnonymous() {
  try {
    if (!("Notification" in window)) return;

    const permission = await Notification.requestPermission();
    if (permission !== "granted") return;

    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_VAPID_KEY,
    });

    if (!token) return;

    await addDoc(collection(db, "pushTokens"), {
      token,
      createdAt: new Date(),
    });

    console.log("Anonymous push token saved");
  } catch (err) {
    console.error("Push registration failed", err);
  }
}
