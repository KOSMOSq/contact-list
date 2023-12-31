import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackIcon from "../../icons/BackIcon";
import { useFormData } from "../../shared/hooks/useFormData";
import { IContacts } from "../../store/features/contactsSlice";
import Modal from "../Modal/Modal";
import LoadingWrapper from "../Wrapper/LoadingWrapper";

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
    const [isOpen, setIsOpen] = useState<boolean>(false);
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
            <h1 className="text-center font-bold pb-10 text-2xl">
                {headerText}
            </h1>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col w-[30rem] bg-white p-4 rounded-lg overflow-auto pb-10">
                    <button
                        className="self-end w-1 pr-5 text-slate-950 hover:text-slate-600"
                        onClick={e => {
                            e.preventDefault();
                            setIsOpen(true);
                        }}
                    >
                        <BackIcon />
                    </button>

                    <label className="text-xl pl-2 pb-2" htmlFor="name">
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
                    <label className="text-xl pl-2 pb-2" htmlFor="mail">
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
            {isOpen && (
                <Modal
                    key={initialValues.id}
                    setIsOpen={setIsOpen}
                    onConfirm={handleBack}
                    headerText="Do you wish to cancel without submitting the form?"
                    activeButton="Confirm"
                />
            )}
        </LoadingWrapper>
    );
};

export default ContactForm;
