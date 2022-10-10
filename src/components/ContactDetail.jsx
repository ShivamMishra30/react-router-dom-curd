import { useMemo } from "react";
import { Form, useNavigation } from "react-router-dom";


const ContactDetail = ({ contact }) => {
    const navigation = useNavigation()
    const textBtn = 
       navigation.state === "loading"
      ? "loading..."
      : "Edit";
  const getAge = useMemo(() => {
    const dob = contact.dob ?? "Provide Age";
    let yearString;
    const diff_ms = Date.now() - Date.parse(dob);
    const yearValue = Math.floor(diff_ms / 31536000000);
    if (yearValue > 1) yearString = " years";
    else yearString = " year";
    return `${yearValue} ${yearString}`;
  }, [contact]);

  return (
    <div id="contact">
      <div>
        <img key={contact.picture} src={contact.picture || null} />
      </div>

      <div>
        <h1>
          {contact ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
        </h1>

        {contact.email && (
          <p>
            <b>Email: </b>
            <a target="_blank" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </p>
        )}

        {contact.country && (
          <p>
            <b>From: </b>
            {contact.country}
          </p>
        )}
        {contact.gender && (
          <p>
            <b>Gender: </b>
            {contact.gender}
          </p>
        )}
        {contact.Email && (
          <p>
            <b>Email: </b>
            {contact.Email}
          </p>
        )}
        {contact.dob && (
          <p>
            <b>Age: </b>
            {getAge}
          </p>
        )}
        {contact.description && (
          <p>
            <b>About me: </b>
            {contact.description}
          </p>
        )}

        <div>
          <Form action="edit">
            <button type="submit">{textBtn}</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit" >Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ContactDetail;
