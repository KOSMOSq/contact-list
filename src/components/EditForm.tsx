import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormData } from "../shared/useFormData";
import { IContacts, updateContact } from "../store/features/contactsSlice";
import {
    selectContactById,
    useAppDispatch,
    useAppSelector
} from "../store/store";

const EditForm: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();
    const [formData, changeFormData, setFormDate] = useFormData<IContacts>({
        id: id as string,
        name: "",
        mail: ""
    });
    const contact = useAppSelector(state => selectContactById(state, id));

    const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (id && formData) {
            dispatch(
                updateContact({ contactId: id, updatedContact: formData })
            );
        }
        navigate("/contacts");
    };

    useEffect(() => {
        if (contact) {
            setFormDate(prev => ({
                ...prev,
                name: contact.name,
                mail: contact.mail
            }));
        }
    }, [contact, setFormDate]);
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
                    name="name"
                    value={formData.name}
                    required
                    onChange={e => changeFormData(e)}
                />
                <label htmlFor="mail">Mail</label>
                <input
                    type="email"
                    id="mail"
                    name="mail"
                    value={formData.mail}
                    required
                    onChange={e => changeFormData(e)}
                />
                <button>Edit contact!</button>
            </form>
        </>
    );
};

export default EditForm;
