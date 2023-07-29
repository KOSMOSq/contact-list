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
            <h1 className="text-center font-bold py-10 text-2xl">
                My Address Book
            </h1>
            {contacts.map(contact => (
                <div className="border p-1" key={contact.id}>
                    <h3>Name: {contact.name}</h3>
                    <h4>Mail: {contact.mail}</h4>
                    <button
                        onClick={() => {
                            deleteContactFirebase(contact.id);
                            dispatch(deleteContact(contact.id));
                        }}
                        className="bg-yellow-300 mx-1 p-1 rounded hover:dark:bg-yellow-400 text-xl"
                    >
                        DELETE
                    </button>
                    <button
                        onClick={() => navigate(`/edit/${contact.id}`)}
                        className="bg-yellow-300 p-1 rounded hover:dark:bg-yellow-400 text-xl"
                    >
                        EDIT
                    </button>
                </div>
            ))}
            <button
                onClick={() => navigate("/add")}
                className="bg-yellow-300 p-1 rounded hover:dark:bg-yellow-400 text-xl mt-5"
            >
                +
            </button>
        </LoadingWrapper>
    );
};

export default ContactsList;
