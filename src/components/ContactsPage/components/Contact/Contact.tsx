import DeleteIcon from "../../../../icons/DeleteIcon";
import EditIcon from "../../../../icons/EditIcon";
import { IContacts } from "../../../../store/features/contactsSlice";

interface IContactProps {
    contact: IContacts;
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
}

const Contact: React.FC<IContactProps> = ({ contact, onDelete, onEdit }) => {
    return (
        <div className="border-b py-2 flex justify-between" key={contact.id}>
            <div>
                <div>
                    <p className="inline text-slate-800 font-semibold">
                        Name:{" "}
                    </p>
                    <p className="inline text-slate-500">{contact.name}</p>
                </div>
                <p className="inline text-slate-800 font-semibold ">Mail: </p>
                <p className="inline text-slate-500">{contact.mail}</p>
            </div>
            <div className="py-2">
                <button
                    onClick={() => {
                        onDelete(contact.id);
                    }}
                    className="text-slate-950 mx-1 p-1 rounded hover:dark:text-red-500 text-xl"
                >
                    <DeleteIcon />
                </button>
                <button
                    onClick={() => onEdit(contact.id)}
                    className="text-slate-950 p-1 rounded hover:dark:text-blue-400 text-xl"
                >
                    <EditIcon />
                </button>
            </div>
        </div>
    );
};

export default Contact;
