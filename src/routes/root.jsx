import { Suspense, useEffect } from "react";
import {
  Await,
  defer,
  Form,
  Outlet,
  useLoaderData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { createContact, getContacts } from "../api/contact";
import SideNav from "../components/SideNav";

export default function Root() {
  const { contacts, q } = useLoaderData();
  const submit = useSubmit();
  const navigation = useNavigation();
  const navigate = useNavigate();
  useEffect(() => {
    const form = document.getElementById("q");
    form.value = q === undefined ? "" : q;
    form.addEventListener("focusout", (event) => {
      form.value = ""
      navigate("/");
    });

  }, [q]);

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  return (
    <>
      <div id="sidebar">
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              className={searching ? "loading" : ""}
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          {/* <Form method="post">
            <button type="submit">New</button>
          </Form> */}
        </div>
        <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={contacts}
            errorElement={
              <ul>
                <li>Check is api running. ref: Readme</li>
                <li>you suck at code</li>
              </ul>
            }
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

export async function loader({ request }) {
  const url = new URL(request.url);
  const searchQuery = url.search;
  // const q = url.searchParams.get("q");
  return defer({ contacts: getContacts(searchQuery), searchQuery });
}

export async function action() {
  await createContact();
}
