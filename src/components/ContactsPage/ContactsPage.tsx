import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlusIcon from "../../icons/PlusIcon";
import SearchIcon from "../../icons/SearchIcon";
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
                        <SearchIcon />
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
                    {contactList.length ? (
                        contactList.map(contact => (
                            <Contact
                                key={contact.id}
                                contact={contact}
                                onDelete={handleDelete}
                                onEdit={handleEdit}
                            />
                        ))
                    ) : (
                        <div className="py-2 text-slate-800 font-semibold">
                            No matching contacts...
                        </div>
                    )}
                </div>
            </div>
            <button
                onClick={() => navigate("/add")}
                className="bg-yellow-300 p-1 rounded hover:dark:bg-yellow-400 text-xl mt-5 w-[30rem] flex justify-center items-center"
            >
                <PlusIcon />
            </button>
        </LoadingWrapper>
    );
};

export default ContactsList;
