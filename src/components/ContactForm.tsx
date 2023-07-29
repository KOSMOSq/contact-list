import { useFormData } from "../shared/useFormData";
import { IContacts } from "../store/features/contactsSlice";
import LoadingWrapper from "./LoadingWrapper";

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
        <LoadingWrapper>
            <form onSubmit={handleSubmit}>
                <h1 className="text-center font-bold py-10 text-2xl">
                    {headerText}
                </h1>
                <div className="flex flex-col w-[30rem] bg-white p-4 rounded-lg overflow-auto">
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
                    <button className="bg-yellow-300 my-10 p-1 rounded hover:dark:bg-yellow-400 text-xl">
                        {buttonText}
                    </button>
                </div>
            </form>
        </LoadingWrapper>
    );
};

export default ContactForm;
