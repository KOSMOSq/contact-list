import {
    SerializedError,
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";
import { toast } from "react-toastify";
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
    async contactId => {
        try {
            await deleteContactFirebase(contactId);
        } catch (error) {
            throw error;
        }
    }
);

export const addContact = createAsyncThunk<void, IContacts>(
    "contacts/addContact",
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
    reducers: {},
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
            })
            .addCase(addContact.fulfilled, _ => {
                toast.success("Contact added!", {
                    position: "bottom-left",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                });
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.contacts = state.contacts.filter(
                    contact => contact.id !== action.meta.arg
                );
                toast.success("Contact deleted!", {
                    position: "bottom-left",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                });
            })
            .addCase(updateContact.fulfilled, (state, action) => {
                const { contactId, updatedContact } = action.meta.arg;
                state.contacts = state.contacts.map(contact =>
                    contact.id === contactId ? updatedContact : contact
                );
                toast.success("Contact updated!", {
                    position: "bottom-left",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                });
            });
    }
});

export default ContactsSlice.reducer;
// export const { } = ContactsSlice.actions;
