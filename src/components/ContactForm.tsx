import { useFormData } from "../shared/useFormData";
import { IContacts } from "../store/features/contactsSlice";

interface IContactFormProps {
    initialValues: IContacts;
    headerText: string;
    buttonText: string;
    onSubmit: (formData: IContacts) => void;
}

const ContactForm: React.FC<IContactFormProps> = ({
    initialValues,
    headerText,
    buttonText,
    onSubmit
}) => {
    const [formData, changeFormData] = useFormData<IContacts>(initialValues);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData);
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1>{headerText}</h1>
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
                <button>{buttonText}</button>
            </form>
        </>
    );
};

export default ContactForm;
