import { useState } from "react";
import { createContext, useContext } from "react";
import api from '../api/contacts';
import {v4 as uuid} from 'uuid';

const contactsCrudContext = createContext();

export function ContactsCrudContextProvider({children}){

    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    //retrieve Contacts function
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    if(response.data) setContacts(response.data);
  }

   //Adding a Contact to the DB
   const addContactHandler = async (contact) => {
    const request = {
      id: uuid(),
      ...contact,
    };

    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  }

  //Updating Contact in DB
  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const {id} = response.data;
    setContacts(
        contacts.map((contact) => {
      return contact.id === id ? {...response.data} : contact;
    }))
  }

   //Search Handler
   const searchHandler= (searchTerm) => {
    setSearchTerm(searchTerm);
   
    if(searchTerm !== ""){
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact).join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      })
      setSearchResult(newContactList);
    }else{
      setSearchResult(contacts);
    }
  }


  //Deleting a Contact 
  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    })

    setContacts(newContactList);
  }

  const value = {
    contacts,
    searchTerm,
    searchResult,
    searchHandler,
    retrieveContacts,
    removeContactHandler,
    addContactHandler,
    updateContactHandler
}

    return <contactsCrudContext.Provider value={value}>
        {children}
    </contactsCrudContext.Provider>
}


export function useContactsCrud(){
    return useContext(contactsCrudContext);
}