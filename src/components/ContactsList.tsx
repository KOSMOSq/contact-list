import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteContact, fetchContacts } from "../store/features/contactsSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import LoadingWrapper from "./LoadingWrapper";

const ContactsList: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const contacts = useAppSelector(state => state.contacts.contacts);
    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    return (
        <LoadingWrapper>
            <h1 className="text-center font-bold pb-5 text-2xl">
                My Address Book
            </h1>
            <input
                className="placeholder:text-slate-400 block bg-white w-[30rem] mb-5  rounded-md py-2 pl-9 pr-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Search for anything..."
                type="text"
            />
            <div className="w-[30rem] bg-white p-4 rounded-lg overflow-auto">
                <div className="min-h-[38rem] max-h-[38rem]">
                    {contacts.map(contact => (
                        <div className="border-b py-2" key={contact.id}>
                            <h3>Name: {contact.name}</h3>
                            <h4>Mail: {contact.mail}</h4>
                            <button
                                onClick={() => {
                                    dispatch(deleteContact(contact.id));
                                }}
                                className="bg-yellow-300 mx-1 p-1 rounded hover:dark:bg-yellow-400 text-xl"
                            >
                                DELETE
                            </button>
                            <button
                                onClick={() => navigate(`/edit/${contact.id}`)}
                                className="bg-yellow-300 p-1 rounded hover:dark:bg-yellow-400 text-xl"
                            >
                                EDIT
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <button
                onClick={() => navigate("/add")}
                className="bg-yellow-300 p-1 rounded hover:dark:bg-yellow-400 text-xl mt-5 w-[30rem]"
            >
                +
            </button>
        </LoadingWrapper>
    );
};

export default ContactsList;
