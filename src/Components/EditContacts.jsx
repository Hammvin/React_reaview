import React from "react";

class EditContacts extends React.Component{
    constructor(props){
        super(props);
        const {id, name, email} = props.location.state.contact;
        this.state = {
            id,
            name,
            email
        }
    }

    Update = (e) =>{
        e.preventDefault();
        if(this.state.name === "" || this.state.email === ""){
            alert("You must fill in all fields")

            return;
        }

        //const navigate  = useNavigate();

        this.props.updateContactHandler(this.state);
        this.setState({name: "", email: ""});
        //this.props.navigate.push("/");  works only with function components
    }


    render(){
        return(
            <div className="ui main" style={{marginTop: 70}}>
                <h2>Edit Contacts</h2>

                <form action="" className="ui form" onSubmit={this.Update}>
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

export default EditContacts