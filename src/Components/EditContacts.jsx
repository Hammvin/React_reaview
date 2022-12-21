import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useContactsCrud } from "../Context/ContactsCrudContext";
import { useNavigate } from "react-router-dom";

const EditContacts = () =>{
    const location = useLocation();
    const {id, name, email} = location.state.contact;
    const [newName, setNewName] = useState(name);
    const [newEmail, setNewEmail] = useState(email);
    const {updateContactHandler} = useContactsCrud();
    const navigate = useNavigate();
  
    const Update = (e) =>{
        e.preventDefault();
        if(newName === "" || newEmail === ""){
            alert("You must fill in all fields")
            return;
        }

        updateContactHandler({id, name: newName, email:newEmail});
        setNewName("");
        setNewEmail("");
        navigate("/");
        
    }


  
    return(
         <div className="ui main" style={{marginTop: 70}}>
              <h2>Edit Contacts</h2>

            <form action="" className="ui form" onSubmit={Update}>
                <div className="field">
                  <label>Name:</label>
                  <input type="text" name="name" 
                     placeholder="Name.." 
                    value={newName} 
                    onChange={(e) => setNewName(e.target.value)}/>
                 </div>
                 <div className="field">
                      <label>Email:</label>
                     <input type="email" name="email" 
                     placeholder="example@test.com" 
                    value={newEmail} 
                     onChange={(e) => setNewEmail(e.target.value)}/>
                 </div>
                 <button className="ui button blue">Add</button>
            </form>
        </div>
    );
    
}

export default EditContacts