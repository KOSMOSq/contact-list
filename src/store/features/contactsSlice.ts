import {
    PayloadAction,
    SerializedError,
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";
import {
    addContactFirebase,
    deleteContactFirebase,
    getContacts,
    updateContactById
} from "../../lib/controllers/contactController";

export interface IContacts {
    id: string;
    name: string;
    mail: string;
}

export interface ContactsState {
    contacts: IContacts[];
    loading: boolean;
    error: null | string;
}

const initialState: ContactsState = {
    contacts: [],
    loading: false,
    error: null
};

export const fetchContacts = createAsyncThunk<IContacts[], void>(
    "contacts/fetchContacts",
    async () => {
        try {
            const contacts = await getContacts();
            return contacts;
        } catch (error) {
            throw error;
        }
    }
);

export const deleteContact = createAsyncThunk<void, string>(
    "contacts/deleteContact",
    async (contactId, { dispatch }) => {
        try {
            await deleteContactFirebase(contactId);
            dispatch(removeContact(contactId));
        } catch (error) {
            throw error;
        }
    }
);

export const addContact = createAsyncThunk<void, IContacts>(
    "contacts/contactData",
    async contactData => {
        try {
            await addContactFirebase(contactData);
        } catch (error) {
            throw error;
        }
    }
);

export const updateContact = createAsyncThunk<
    void,
    { contactId: string; updatedContact: IContacts }
>("contacts/updateContact", async ({ contactId, updatedContact }) => {
    try {
        await updateContactById(contactId, updatedContact);
    } catch (error) {
        throw error;
    }
});
export const ContactsSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {
        // addContact: (state, action: PayloadAction<IContacts>) => {
        //     state.contacts.push(action.payload);
        // },
        removeContact: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            state.contacts = state.contacts.filter(
                contact => contact.id !== id
            );
        }
        // updateContact: (state, action: PayloadAction<IContacts>) => {
        //     state.contacts = state.contacts.map(contact =>
        //         contact.id === action.payload.id
        //             ? { ...contact, ...action.payload }
        //             : contact
        //     );
        // }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchContacts.pending, state => {
                state.loading = true;
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.loading = false;
                state.contacts = action.payload;
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    (action.payload as SerializedError)?.message ||
                    "Unknown error";
            });
    }
});

export default ContactsSlice.reducer;
export const { removeContact } = ContactsSlice.actions;
