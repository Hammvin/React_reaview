import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import AddContacts from './Components/AddContacts';
import ContactList from './Components/ContactList';
import ContactDetails from './Components/ContactDetails';
import EditContacts from './Components/EditContacts';
import {ContactsCrudContextProvider} from "./Context/ContactsCrudContext";

function App() {
  




  return(
    <div className="ui container"> 
      <Header /> 
      <ContactsCrudContextProvider>
        <Routes>
          <Route path="/" element={<ContactList />}/>
          <Route path="/add" element={<AddContacts />}/>
          <Route path='/edit/:id' element={<EditContacts />}/>
          <Route path='/details/:id' element={<ContactDetails />} />
        </Routes>
      </ContactsCrudContextProvider>
    </div>
  );
}

export default App;
