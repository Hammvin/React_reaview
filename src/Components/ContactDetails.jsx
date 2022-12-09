import React from 'react'
import {Link} from 'react-router-dom';
import user from '../Images/user.png';

const ContactDetails = (props) => {

  const {name, email} = props.contact;
  return (
    <div className='main'>
        <div className="ui card centered" style={{marginTop: 100}}>
            <div className="image">
                <img src={user} alt="user" />
            </div>

            <div className="content">
                <div className="header">{name}</div>
                <div className="description">{email}</div>
            </div>
        </div>
        <div className="center-div">
          <Link to='/'>
            <button className='ui button blue center'>Back</button>
            </Link>
        </div>
    </div>
  )
}

export default ContactDetails