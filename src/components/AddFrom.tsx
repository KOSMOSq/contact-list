import { useNavigate } from "react-router-dom";
import { generateUniqueId } from "../shared/generateIdFunc";
import { useFormData } from "../shared/useFormData";
import { IContacts, addContact } from "../store/features/contactsSlice";
import { useAppDispatch } from "../store/store";

const AddForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [formData, changeFormData] = useFormData<IContacts>({
        id: "",
        name: "",
        mail: ""
    });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const id = generateUniqueId();
        const contactWithId: IContacts = { ...formData, id };
        dispatch(addContact(contactWithId));
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
                <button>Add contact!</button>
            </form>
        </>
    );
};

export default AddForm;
