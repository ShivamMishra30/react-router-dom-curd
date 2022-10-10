import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import { getContact } from "../api/contact";
import ContactDetail from "../components/ContactDetail";

export default function Contact() {
  const data = useLoaderData();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Await resolve={data.contact} errorElement={<p>Error loading contact.</p>}>
        {(loadedContact) => <ContactDetail contact={loadedContact} />}
      </Await>
    </Suspense>
  );
}

export async function loader({ params }) {
  const id = params.contactId
  return defer({ contact: getContact(id) });
}
