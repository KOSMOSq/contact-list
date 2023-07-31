import { RouteObject } from "react-router";
import ContactsList from "../ContactsPage/ContactsPage";
import AddForm from "../Forms/AddFrom";
import EditForm from "../Forms/EditForm";
import HomePage from "../HomePage/HomePage";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <HomePage />
    },
    {
        path: "/contacts",
        element: <ContactsList />
    },
    {
        path: "/add",
        element: <AddForm />
    },
    {
        path: "/edit/:id",
        element: <EditForm />
    }
];
