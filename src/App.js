import React, {useState, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import api from './api/contacts';
import './App.css';
import Header from './Components/Header';
import AddContacts from './Components/AddContacts';
import ContactList from './Components/ContactList';
import ContactDetails from './Components/ContactDetails';
import EditContacts from './Components/EditContacts';
import { v4 as uuid } from 'uuid';

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

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
    setContacts(contacts.map((contact) => {
      return contact.id === id ? {...response.data} : contact;
    }))
  }

  //Deleting a Contact 
  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    })

    setContacts(newContactList);
  }

  //retrieve Contacts function
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
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

  //Retrieving Contacts and Updating State
  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if(allContacts) setContacts(allContacts);
    }

    getAllContacts();
  }, []);

  return(
    <div className="ui container"> 
      <Header /> 
        <Routes>
          <Route path="/" element={<ContactList 
          term={searchTerm} searchKeyword={searchHandler}
          contacts={searchTerm.length < 1 ? contacts : searchResult} 
          getContactId={removeContactHandler}/>}
          />
          <Route path="/add" element={<AddContacts addContactHandler={addContactHandler}/>}/>
          <Route path='/edit/:id' element={<EditContacts updateContactHandler={updateContactHandler}/>}/>
          <Route path='/details/:id' element={<ContactDetails  contacts={contacts}/>} />
        </Routes>
    </div>
  );
}

export default App;
