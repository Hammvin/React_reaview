import React from 'react';
import {Link} from 'react-router-dom';
import { useContactsCrud } from '../Context/ContactsCrudContext';
import user from '../Images/user.png';

const ContactCard = (props) => {
  const {removeContactHandler} = useContactsCrud();

  const deleteContact = (id) => {
    removeContactHandler(id);
  }
  const {id, name,email} = props.contact;
  return (
    <div className="item">
      <img className="ui avatar image" src={user} alt="user" />
        <div className="content" name={id} style={{display: 'flex', flexDirection: 'row'}}>
          <div>
            <Link to={{pathname: `/details/${id}`, state:{contact: props.contact}}}>
              <div className="header">{name}</div>
              <div>{email}</div>
            </Link>
          </div>
          <div>
            <Link to={`/edit/${id}`} 
            state ={{contact: props.contact}}>
              <i className="edit alternate outline icon" 
              style={{color: "blue", marginTop:"7px"}}
              ></i>
            </Link>

            <i className="trash alternate outline icon" 
            style={{color: "red", marginTop:"7px",marginLeft: "10px"}}
            onClick={() => deleteContact(id)}
            ></i>
          </div>
        </div>
        
      </div>
  );
}

export default ContactCard