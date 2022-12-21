import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContactsCrud } from "../Context/ContactsCrudContext";

const AddContacts = () =>{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const {addContactHandler} = useContactsCrud();
    const navigate = useNavigate();

   const Add = (e) =>{
        e.preventDefault();
        if(name === "" || email === ""){
            alert("You must fill in all fields")
            return;
        }

        addContactHandler({name, email});
        setName("");
        setEmail("");
        navigate("/"); 
    }

    return(
        <div className="ui main" style={{marginTop: 70}}>
            <h2>Add Contacts</h2>

            <form action="" className="ui form" onSubmit={Add}>
                  <div className="field">
                      <label>Name:</label>
                     <input type="text" name="name" 
                     placeholder="Name.." 
                     value={name} 
                     onChange={(e) => setName(e.target.value)}/>
                </div>
                 <div className="field">
                       <label>Email:</label>
                       <input type="email" name="email" 
                       placeholder="example@test.com" 
                       value={email} 
                       onChange={(e) => setEmail(e.target.value)}/>
                 </div>
                 <button className="ui button blue">Add</button>
            </form>
        </div>
    );
    
}

export default AddContacts