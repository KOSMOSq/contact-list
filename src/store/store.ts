import { configureStore, createSelector } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ContactsSlice } from "./features/contactsSlice";

export const store = configureStore({
    reducer: { contacts: ContactsSlice.reducer }
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const contactsSelector = (state: RootState) => state.contacts.contacts;

export const selectContactById = createSelector(
    [contactsSelector, (_: RootState, userId: string | undefined) => userId],
    (contacts, userId) => contacts.find(contact => contact.id === userId)
);
