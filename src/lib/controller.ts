import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    getFirestore,
    query,
    updateDoc,
    where
} from "firebase/firestore";
import { IContacts } from "../store/features/contactsSlice";
import { app } from "./firebase";

export const firestore = getFirestore(app);

export const contactsCollection = collection(firestore, "contacts");

export const addContactFirebase = async (contactData: IContacts) => {
    await addDoc(contactsCollection, { ...contactData });
};

export const deleteContactFirebase = async (id: string) => {
    const q = query(contactsCollection, where("id", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async doc => {
        await deleteDoc(doc.ref);
    });
};

export const updateContactById = async (id: string, updatedData: any) => {
    const q = query(contactsCollection, where("id", "==", id));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        const contactDoc = querySnapshot.docs[0];
        const contactRef = doc(firestore, contactDoc.ref.path);
        await updateDoc(contactRef, updatedData);
    }
};
