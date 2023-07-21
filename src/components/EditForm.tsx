import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateContact } from "../store/features/contactsSlice";
import {
    selectContactById,
    useAppDispatch,
    useAppSelector
} from "../store/store";

const EditForm: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();
    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const contact = useAppSelector(state => selectContactById(state, id));

    const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (id) {
            dispatch(updateContact({ id, name, mail }));
        }
        navigate("/contacts");
    };

    useEffect(() => {
        if (contact) {
            setName(contact.name);
            setMail(contact.mail);
        }
    }, [contact]);
    return (
        <>
            <form
                onSubmit={e => {
                    handleEditSubmit(e);
                }}
            >
                <h1>Edit contact</h1>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    required
                    onChange={e => setName(e.target.value)}
                />
                <label htmlFor="mail">Mail</label>
                <input
                    type="email"
                    id="mail"
                    value={mail}
                    required
                    onChange={e => setMail(e.target.value)}
                />
                <button>Edit contact!</button>
            </form>
        </>
    );
};

export default EditForm;
