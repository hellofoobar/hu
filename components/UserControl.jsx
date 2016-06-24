import React from 'react';
import $ from 'jquery';
import UserList from './UserList.jsx';
import NewUser from './NewUser.jsx';
import EditUser from './EditUser.jsx';
var ReactRouter = require('react-router');
var Link = ReactRouter.Link

export default class UserControl extends React.Component {
	// static propTypes = {
	// 	url: React.PropTypes.string.isRequired,
 //    };

 //    static defaultProps = {
 //        url: '/users/control',
 //    };

	state = {
		users: [],
		edit: false,
		whoToEdit: {}
	}
    constructor(props) {
        super(props);
        this.displayName = 'UserControl';
    }
	fetchUsersFromServer() {
	    $.ajax({
	      url: '/users',
	      dataType: 'json',
	      success: (data) => {
	      	console.log(this.state.users);
	        this.setState({users: JSON.parse(data)});
	        console.log(this.state.users);
	      },
	      error: (xhr, status, err) => {
	        console.error('/users', status, err.toString());
	      }
	    });
  	}
  	handleAddNewUser(user) {
	    // var users = this.state.users;
	    // var newUsers = users.push(user);
	    // this.setState({users: newUsers});
		console.log('new user requested');
	    $.ajax({
	      type: 'POST',
	      url: 'users/new',
	      dataType: 'json',
	      // data: user,
	      data: {
	      	id: user.id,
	      	firstName: user.firstName,
	      	lastName: user.lastName
	      },
	      success: (data) => {
	      	console.log(data);
	        this.setState({users: data});
	      },
	      error: (xhr, status, err) => {
	        console.error('users/new', status, err.toString());
	      }
	    });
  	}
  	handleDeleteUser(user) {
		console.log('delete user requested');
		console.log(user.id);
	    $.ajax({
	      type: 'DELETE',
	      url: 'users/' + user.id,
	      dataType: 'json',
	      success: (data) => {
	      	console.log(data);
	        this.setState({users: data});
	      },
	      error: (xhr, status, err) => {
	        console.error('users/' + user.id, status, err.toString());
	      }
	    });
  	}
  	handleEditUser(user) {
		console.log('new user requested');
	    $.ajax({
	      type: 'PUT',
	      url: 'users/' + this.state.whoToEdit.id,
	      dataType: 'json',
	      data: {
	      	id: user.id,
	      	firstName: user.firstName,
	      	lastName: user.lastName
	      },
	      success: (data) => {
	      	console.log(data);
	        this.setState({users: data});
	      },
	      error: (xhr, status, err) => {
	        console.error('users/' + this.state.whoToEdit.id, status, err.toString());
	      }
	    });
  	}
	editToggle() {
		this.setState({edit: !this.state.edit});
	}
	editSelect(user) {
		this.setState({
			edit: true,
			whoToEdit: user
		});
	}
  	componentDidMount() {
    	this.fetchUsersFromServer();
   	}
   					// <Link to = '/users/new'>
        //     		<button>Add New User</button>
        //     	</Link>

    render() {
    	console.log('Edit this guy ' + this.state.whoToEdit.firstName);
	    	return (
				<div className="UserControl">
				    <UserList users={this.state.users} onEditSelect={this.editSelect.bind(this)} onDeleteUser={this.handleDeleteUser.bind(this)}/>
	            	{
	            		this.state.edit ? 
	            		<EditUser edit={this.editToggle.bind(this)} whoToEdit={this.state.whoToEdit} onEditUser={this.handleEditUser.bind(this)}/> : 
	            		<NewUser onAddNewUser={this.handleAddNewUser.bind(this)}/>
	            	}
	    		</div>
	        ) 
    }
}
