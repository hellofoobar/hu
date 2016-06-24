import React from 'react';
import ReactDOM from 'react-dom';

export default class EditUser extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'EditUser';
    }
    handleSubmit(e) {
	    e.preventDefault();
	    console.log('handle EDIT submit fired')
	    var id = ReactDOM.findDOMNode(this.refs.id).value.trim();
	    var firstName = ReactDOM.findDOMNode(this.refs.firstName).value.trim();
	    var lastName = ReactDOM.findDOMNode(this.refs.lastName).value.trim();
	    if (!id || !firstName || !lastName) {
	      return;
	    }
	    this.props.onEditUser({id: id, firstName: firstName, lastName});
	    ReactDOM.findDOMNode(this.refs.id).value = '';
	    ReactDOM.findDOMNode(this.refs.firstName).value = '';
	    ReactDOM.findDOMNode(this.refs.lastName).value = '';
	    return;
  	}
    render() {
        return (
        	<div>
        	  <h3>Edit User: {this.props.whoToEdit.id}</h3>
        	  <form className="editUserForm" onSubmit={this.handleSubmit.bind(this)}>
		      <input type="text" placeholder="ID" ref="id" name="id"/>
		      <input type="text" placeholder="First Name" ref="firstName" name="firstName"/>
		      <input type="text" placeholder="Last Name" ref="lastName" ref="lastName"/>
		      <input type="submit" value="Confirm" />
		      <button onClick={() => this.props.edit()}>Cancel</button>
		      </form>
        	</div>
        )
    }
}