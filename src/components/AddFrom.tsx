import { useNavigate } from "react-router-dom";
import { generateUniqueId } from "../shared/generateIdFunc";
import { IContacts, addContact } from "../store/features/contactsSlice";
import { useAppDispatch } from "../store/store";
import ContactForm from "./ContactForm";

const AddForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleAddSubmit = (formData: IContacts) => {
        const id = generateUniqueId();
        const contactWithId: IContacts = { ...formData, id };
        dispatch(addContact(contactWithId));
        navigate("/contacts");
    };
    return (
        <>
            <ContactForm
                initialValues={{ id: "", name: "", mail: "" }}
                headerText="Add contact form"
                buttonText="Add contact!"
                onSubmit={handleAddSubmit}
            />
        </>
    );
};

export default AddForm;
