import React from "react";

class AddContacts extends React.Component{
    state = {
        name: "",
        email: ""
    }

    Add = (e) =>{
        e.preventDefault();
        if(this.state.name === "" || this.state.email === ""){
            alert("You must fill in all fields")

            return;
        }

        //const navigate  = useNavigate();

        this.props.addContactHandler(this.state);
        this.setState({name: "", email: ""});
        //this.props.navigate.push("/");  works only with function components
    }


    render(){
        return(
            <div className="ui main" style={{marginTop: 70}}>
                <h2>Add Contacts</h2>

                <form action="" className="ui form" onSubmit={this.Add}>
                    <div className="field">
                        <label>Name:</label>
                        <input type="text" name="name" 
                        placeholder="Name.." 
                        value={this.state.name} 
                        onChange={(e) => this.setState({name: e.target.value})}/>
                    </div>
                    <div className="field">
                        <label>Email:</label>
                        <input type="email" name="email" 
                        placeholder="example@test.com" 
                        value={this.state.email} 
                        onChange={(e) => this.setState({email: e.target.value})}/>
                    </div>
                    <button className="ui button blue">Add</button>
                </form>
            </div>
        );
    }
}

export default AddContacts