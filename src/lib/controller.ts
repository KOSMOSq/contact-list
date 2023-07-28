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
export const COLLECTION_NAME = "contacts";
export const contactsCollection = collection(firestore, COLLECTION_NAME);

export const getContacts = async () => {
    const querySnapshot = await getDocs(collection(firestore, COLLECTION_NAME));
    const data = querySnapshot.docs.map(doc => doc.data()) as Record<
        string,
        any
    >;
    const contacts = Object.keys(data).map((contactId: string) => ({
        id: contactId,
        ...data[contactId]
    }));
    return contacts;
};

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
