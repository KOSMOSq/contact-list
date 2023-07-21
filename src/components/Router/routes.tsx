import { RouteObject } from "react-router";
import AddForm from "../AddFrom";
import ContactsList from "../ContactsList";
import EditForm from "../EditForm";
import HomePage from "../HomePage";

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
