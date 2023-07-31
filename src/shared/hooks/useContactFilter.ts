import { useState } from "react";
import { IContacts } from "../../store/features/contactsSlice";

export const useContactFilter = (contacts: IContacts[]) => {
    const [filterValue, setFilterValue] = useState<string>("");

    const filteredContacts = contacts.filter((contact: IContacts) => {
        return (
            contact.name.toLowerCase().includes(filterValue.toLowerCase()) ||
            contact.mail.toLowerCase().includes(filterValue.toLowerCase())
        );
    });

    return { filterValue, setFilterValue, filteredContacts };
};
