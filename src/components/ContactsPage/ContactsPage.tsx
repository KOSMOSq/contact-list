import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContactFilter } from "../../shared/hooks/useContactFilter";
import {
    deleteContact,
    fetchContacts
} from "../../store/features/contactsSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import LoadingWrapper from "../Wrapper/LoadingWrapper";
import Contact from "./components/Contact/Contact";

const ContactsList: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const contacts = useAppSelector(state => state.contacts.contacts);
    const { filterValue, setFilterValue, filteredContacts } =
        useContactFilter(contacts);

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    const handleDelete = (id: string) => {
        dispatch(deleteContact(id));
    };

    const handleEdit = (id: string) => {
        navigate(`/edit/${id}`);
    };

    const contactList = filterValue ? filteredContacts : contacts;

    return (
        <LoadingWrapper>
            <h1 className="text-center font-bold pb-5 text-2xl">
                My Contacts List 📋
            </h1>
            <form>
                <label className="relative block">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-slate-400">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                        </svg>
                    </span>
                    <input
                        className="placeholder:text-slate-400 block bg-white w-[30rem] mb-5  rounded-md py-2 pl-9 pr-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                        placeholder="Search for contacts..."
                        onChange={e => setFilterValue(e.target.value)}
                        type="text"
                    />
                </label>
            </form>
            <div className="w-[30rem] bg-white p-4 rounded-lg overflow-auto">
                <div className="min-h-[38rem] max-h-[38rem]">
                    {contactList.map(contact => (
                        <Contact
                            contact={contact}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                    ))}
                </div>
            </div>
            <button
                onClick={() => navigate("/add")}
                className="bg-yellow-300 p-1 rounded hover:dark:bg-yellow-400 text-xl mt-5 w-[30rem] flex justify-center items-center"
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
                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </button>
        </LoadingWrapper>
    );
};

export default ContactsList;
