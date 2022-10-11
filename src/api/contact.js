import { sleep } from "./sleep";

const getContacts = async (q) => {
  if (q.length) {
    const data = await fetch(`http://localhost:3000/data${q}`);
    return data.json();
  }
  await sleep(2000);
  const data = await fetch("http://localhost:3000/data");
  if (!data.ok) {
    throw new Response("Failed to fetch posts.", { status: 500 });
  }
  return data.json();
};

const getContact = async (id) => {
  await sleep(2000);
  const data = await fetch(`http://localhost:3000/data/${id}`);
  if (!data.ok) {
    throw new Response("Failed to fetch posts.", { status: 500 });
  }
  return data.json();
};

const createContact = () => {
  console.log("Creatng Contact");
};

const updateContact = async (contactId, newObj) => {
  console.log(newObj);
  if (newObj.first.length < 2 || newObj.last.length < 2) {
    throw { message: "Invalid input data provided.", status: 422 };
  }
  await sleep(2000);
  const id = parseInt(contactId);
  const data = { id, ...newObj };
  const res = await fetch(`http://localhost:3000/data/${id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Response("Failed to fetch posts.", { status: 500 });
  }
};

const deleteContact = async (id) => {
  const res = await fetch(`http://localhost:3000/data/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

export { getContacts, createContact, getContact, updateContact, deleteContact };
