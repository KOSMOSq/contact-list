import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteContactFirebase } from "../lib/controller";
import { deleteContact, fetchContacts } from "../store/features/contactsSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import LoadingWrapper from "./LoadingWrapper";

const ContactsList: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const contacts = useAppSelector(state => state.contacts.contacts);
    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    return (
        <LoadingWrapper>
            <h1>My Address Book</h1>
            {contacts.map(contact => (
                <div key={contact.id}>
                    <h3>Name: {contact.name}</h3>
                    <h4>Mail: {contact.mail}</h4>
                    <button
                        onClick={() => {
                            deleteContactFirebase(contact.id);
                            dispatch(deleteContact(contact.id));
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
        </LoadingWrapper>
    );
};

export default ContactsList;
