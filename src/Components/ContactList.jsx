import React from 'react';
import ContactCard from './ContactCard';
import { Link } from 'react-router-dom';

const ContactList = (props) => {

  // const contacts = [
  //   {
  //     id: 1,
  //     name: "Harvey Hammond",
  //     email: "harveyh@gmail.com"
  //   }
  // ]

  const deleteContactHandler = (id) => {
    props.getContactId(id);
  }

  const renderContacts = props.contacts.map((contact) => {
    return (
      <ContactCard contact={contact} clickHandler={deleteContactHandler}/>
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
          <input type="text" placeholder='Search contact' className='prompt' />
          <i className='ui search'></i>
        </div>
      </div>
        <div className='ui celled list'>{renderContacts}</div>
    </div>
    
  );
}

export default ContactList