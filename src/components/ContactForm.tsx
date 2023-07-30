import { useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
    const [formData, changeFormData] = useFormData<IContacts>(initialValues);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData);
    };
    const handleBack = () => {
        navigate("/contacts");
    };

    return (
        <LoadingWrapper>
            <form onSubmit={handleSubmit}>
                <h1 className="text-center font-bold pb-10 text-2xl">
                    {headerText}
                </h1>
                <div className="flex flex-col w-[30rem] bg-white p-4 rounded-lg overflow-auto pb-10">
                    <button
                        className="self-end w-1 pr-5 text-slate-950 hover:text-slate-600"
                        onClick={handleBack}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    <label className="text-xl pl-4" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="placeholder:text-slate-400 border-[1px] border-slate-400  block mb-10 rounded-md py-2 pl-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                        placeholder="Enter name here"
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        required
                        onChange={e => changeFormData(e)}
                    />
                    <label className="text-xl pl-4" htmlFor="mail">
                        Mail
                    </label>
                    <input
                        className="placeholder:text-slate-400 border-[1px] border-slate-400  block mb-5 rounded-md py-2 pl-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                        placeholder="Enter mail here"
                        type="email"
                        id="mail"
                        name="mail"
                        value={formData.mail}
                        required
                        onChange={e => changeFormData(e)}
                    />
                    <button className="bg-yellow-300 mt-10 p-1 rounded hover:dark:bg-yellow-400 text-xl">
                        {buttonText}
                    </button>
                </div>
            </form>
        </LoadingWrapper>
    );
};

export default ContactForm;
