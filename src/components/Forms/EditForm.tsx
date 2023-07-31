import { useNavigate, useParams } from "react-router-dom";
import { IContacts, updateContact } from "../../store/features/contactsSlice";
import {
    selectContactById,
    useAppDispatch,
    useAppSelector
} from "../../store/store";
import ContactForm from "./ContactForm";

const EditForm: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();
    const contact = useAppSelector(state => selectContactById(state, id));

    const handleEditSubmit = (formData: IContacts) => {
        if (formData) {
            dispatch(
                updateContact({
                    contactId: formData.id,
                    updatedContact: formData
                })
            );
        }
        navigate("/contacts");
    };
    return (
        <>
            <ContactForm
                initialValues={contact as IContacts}
                headerText="Edit contact 📝"
                buttonText="Edit contact!"
                onSubmit={handleEditSubmit}
            />
        </>
    );
};

export default EditForm;
