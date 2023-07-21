import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";

export interface Contacts {
    id: string;
    name: string;
    mail: string;
}

export interface ContactsState {
    contacts: Contacts[];
    loading: boolean;
    error: null | string;
}

const initialState: ContactsState = {
    contacts: [],
    loading: false,
    error: null
};

export const ContactsSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {
        addContact: (state, action: PayloadAction<Contacts>) => {
            state.contacts.push(action.payload);
        },
        removeContact: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            state.contacts = state.contacts.filter(
                contact => contact.id !== id
            );
        },
        updateContact: (state, action: PayloadAction<Contacts>) => {
            state.contacts = state.contacts.map(contact =>
                contact.id === action.payload.id
                    ? { ...contact, ...action.payload }
                    : contact
            );
        }
    }
});

export default ContactsSlice.reducer;
export const { addContact, removeContact, updateContact } =
    ContactsSlice.actions;
