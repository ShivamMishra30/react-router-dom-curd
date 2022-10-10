import { Form, redirect, useActionData, useLoaderData, useNavigate, useNavigation, useParams } from "react-router-dom";
import { getContact, updateContact } from "../api/contact";

export default function EditContact() {
  const contact = useLoaderData();
  const navigate = useNavigate();
  const params = useParams()
  const navigation = useNavigation()
  const data = useActionData()

  const textBtn = navigation.state === "submitting"
      ? "Saving..."
      : navigation.state === "loading"
      ? "Saved!"
      : "Go";
  function handleCancel() {
    const { contactId } = params
    const id = parseInt(contactId)
    navigate(`/contacts/${id}`);
  }
  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="Name"
          aria-label="name"
          type="text"
          name="first"
          defaultValue={contact.first}
        />
        <input
          placeholder="Name"
          aria-label="name"
          type="text"
          name="last"
          defaultValue={contact.last}
        />
      </p>
      <label>
        <span>Date Of Birth</span>
        <input type="date" name="dob" id="dob" defaultValue={contact.dob}/>
      </label>
      <label>
        <span>Country</span>
        <input type="text" name="country" id="country"  defaultValue={contact.country}/>
      </label>
      <label>
        <span>Gender</span>
        <div>
      <input type="checkbox" id="gender" name="gender" value='female' checked={contact.gender === 'female' ? true : false}/>
      <label htmlFor="female">Female</label>
    </div>

    <div>
      <input type="checkbox" id="gender" name="gender" value='male' checked={contact.gender === 'male' ? true : false}/>
      <label htmlFor="male">Male</label>
    </div>
      </label>

      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="picture"
          defaultValue={contact.picture}
        />
      </label>
      <label>
        <span>Email</span>
        <input type="email" name="email" id="email" defaultValue={contact.email} />
      </label>
      <label>
        <span>Notes</span>
        <textarea
          name="description"
          defaultValue={contact.description}
          rows={6}
        />
      </label>
    {data && data.status && <p>Invaild Input Values</p>}
      <p>
        <button type="submit">{textBtn}</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </p>
    </Form>
  );
}

export async function loader({ params }) {
  return await getContact(params.contactId);
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
   const validationError = await updateContact(params.contactId, updates);
   if (validationError) {
    return validationError;
  }
  return redirect(`/contacts/${params.contactId}`);
}