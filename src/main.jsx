import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import "./index.css";
import Root, { loader as contactsLoader, action as contactsAction } from "./routes/root";
import EditContact, { loader as editLoader, action as editAction} from "./routes/edit"; 
import ErrorPage from './Pages/error'
import Contact, {loader as contactLoader} from "./routes/contact";
import {action as destroyAction} from "./routes/destory";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage/>,
    loader: contactsLoader,
    action: contactsAction,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: editLoader,
        action: editAction,
        // shouldRevalidate: ({ currentUrl, nextUrl}) => {
        //   return currentUrl.pathname === "/contacts/1/edit" || nextUrl.pathname === '/contacts/1';
        // }
      },
      {
        path: "contacts/:contactId/destroy",
        action: destroyAction,
      },
    ],
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);