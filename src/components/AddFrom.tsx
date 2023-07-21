import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateUniqueId } from "../shared/generateIdFunc";
import { addContact } from "../store/features/contactsSlice";
import { useAppDispatch } from "../store/store";

const AddForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let id = generateUniqueId();
        dispatch(addContact({ id, name, mail }));
        navigate("/contacts");
    };
    return (
        <>
            <form
                onSubmit={e => {
                    handleSubmit(e);
                }}
            >
                <h1>Add contact</h1>
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
                <button>Add contact!</button>
            </form>
        </>
    );
};

export default AddForm;
