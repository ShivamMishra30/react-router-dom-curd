import { Link } from "react-router-dom";

const SideNav = ({loadedContacts}) => {
  return (
    <nav>
      {loadedContacts.length ? (
        <ul>
          {loadedContacts.map((contact) => (
            <li key={contact.id}>
              <Link to={`contacts/${contact.id}`}>
                {contact && `${contact.first} ${contact.last}`}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>
          <i>No contacts</i>
        </p>
      )}
    </nav>
  );
};

export default SideNav