import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { contactsCollection, deleteContactFirebase } from "../lib/controller";
import { IContacts, removeContact } from "../store/features/contactsSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

const ContactsList: React.FC = () => {
    const contacts = useAppSelector(state => state.contacts.contacts);
    const [contact, setContact] = useState<IContacts[]>([]);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        onSnapshot(contactsCollection, snapshot => {
            setContact(
                snapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: data.id,
                        name: data.name,
                        mail: data.mail
                    };
                })
            );
        });
    }, []);

    return (
        <>
            <h1>My Address Book</h1>
            {contact.map(contact => (
                <div key={contact.id}>
                    <h3>Name: {contact.name}</h3>
                    <h4>Mail: {contact.mail}</h4>
                    <button
                        onClick={() => {
                            deleteContactFirebase(contact.id);
                            dispatch(removeContact(contact.id));
                        }}
                    >
                        DELETE
                    </button>
                    <button onClick={() => navigate(`/edit/${contact.id}`)}>
                        EDIT
                    </button>
                    <hr />
                </div>
            ))}
            <button onClick={() => navigate("/add")}>+</button>
        </>
    );
};

export default ContactsList;
