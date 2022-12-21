import React from 'react';
import ContactCard from './ContactCard';
import { Link } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { useContactsCrud } from '../Context/ContactsCrudContext';

const ContactList = (props) => {
  const {contacts, searchTerm, searchResult, searchHandler, retrieveContacts} = useContactsCrud();

  const inputEl = useRef("");

  const onUserSearch = (e) => {
    searchHandler(e.target.value)
  }


  useEffect(() => {
    retrieveContacts();
  }, [retrieveContacts]);

  const renderContacts = (searchTerm.length < 1 ? contacts : searchResult).map((contact) => {
    return (
      <ContactCard contact={contact} />
    );
  });
  
  return (
    <div className="main">
      <h2 style={{display:'flex', flexDirection: 'row', marginTop: 70, gap: 800}}>
        Contact List
        <Link to="/add">
          <button className="ui button blue right">Add Contact</button>
        </Link>
      </h2>
      <div className="ui search">
        <div className="ui icon input">
          <input type="text" 
          ref={inputEl}
          placeholder='Search contact' 
          className='prompt' 
          value={searchTerm} 
          onChange={(e) => onUserSearch(e)} 
          />

          <i className='ui search'></i>
        </div>
      </div>
        <div className='ui celled list'>{renderContacts}</div>
    </div>
    
  );
}

export default ContactList