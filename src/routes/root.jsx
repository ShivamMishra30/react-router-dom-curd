import { Suspense } from "react";
import {
  Await,
  defer,
  Form,
  Outlet,
  useLoaderData,
} from "react-router-dom";
import { createContact, getContacts } from "../api/contact";
import SideNav from "../components/SideNav";
export default function Root() {
  const { contacts } = useLoaderData();
  return (
    <>
      <div id="sidebar">
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={contacts}
            errorElement={<p>Error loading blog posts.</p>}
          >
            {(loadedContacts) => <SideNav loadedContacts={loadedContacts} />}
          </Await>
        </Suspense>
        
      </div>
      <div id="detail">
          <Outlet />
        </div>
    </>
  );
}

export async function loader() {
  return defer({ contacts: getContacts() });
}

export async function action() {
  await createContact();
}
