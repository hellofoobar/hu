import React from 'react';

export default class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'UserList';
    }
    render() {
	  return (
	  	<div>
	  	{	  		
	  		this.props.users.length > 0 ? 
			  	<div>
				  	<h1>All Users</h1>
				  	<ul>
				  		{this.props.users.map((user) => {
				      		return ( 
				      			<li>
				      				User: {user.id} {user.firstName} {user.lastName} 
				      				<button onClick={() => this.props.onEditSelect(user)}>Edit User</button> 
				      				<button onClick={() => this.props.onDeleteUser(user)}>Delete User</button>
				      			</li>
				      		)
				      	})}
				    </ul>
			    </div> : <h1>No Users</h1>
		}
		</div>
	  )	    
    }
}
