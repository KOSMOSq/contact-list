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
                My Contacts List 📋
            </h1>
            <input
                className="placeholder:text-slate-400 block bg-white w-[30rem] mb-5  rounded-md py-2 pl-9 pr-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Search for anything... * in developing *"
                type="text"
            />
            <div className="w-[30rem] bg-white p-4 rounded-lg overflow-auto">
                <div className="min-h-[38rem] max-h-[38rem]">
                    {contacts.map(contact => (
                        <div
                            className="border-b py-2 flex justify-between"
                            key={contact.id}
                        >
                            <div>
                                <div>
                                    <p className="inline text-slate-800 font-semibold">
                                        Name:{" "}
                                    </p>
                                    <p className="inline text-slate-500">
                                        {contact.name}
                                    </p>
                                </div>
                                <p className="inline text-slate-800 font-semibold ">
                                    Mail:{" "}
                                </p>
                                <p className="inline text-slate-500">
                                    {contact.mail}
                                </p>
                            </div>
                            <div className="py-2">
                                <button
                                    onClick={() => {
                                        dispatch(deleteContact(contact.id));
                                    }}
                                    className="text-slate-950 mx-1 p-1 rounded hover:dark:text-red-500 text-xl"
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
                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                        />
                                    </svg>
                                </button>
                                <button
                                    onClick={() =>
                                        navigate(`/edit/${contact.id}`)
                                    }
                                    className="text-slate-950 p-1 rounded hover:dark:text-blue-400 text-xl"
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
                                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
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
