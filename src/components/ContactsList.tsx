import { useNavigate } from "react-router-dom";
import { removeContact } from "../store/features/contactsSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

const ContactsList: React.FC = () => {
    const contacts = useAppSelector(state => state.contacts.contacts);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    return (
        <>
            <h1>My Address Book</h1>
            {contacts.map(contact => (
                <div key={contact.id}>
                    <h3>Name: {contact.name}</h3>
                    <h4>Mail: {contact.mail}</h4>
                    <button
                        onClick={() => {
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
