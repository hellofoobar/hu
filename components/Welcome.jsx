import React from 'react';
var ReactRouter = require('react-router');
var Link = ReactRouter.Link

export default class Welcome extends React.Component {
	static propTypes = {
		title: React.PropTypes.string.isRequired,
    };

    static defaultProps = {
        title: "Lab 7",
    };

    constructor(props) {
        super(props);
        this.displayName = 'Welcome';
    }
    render() {
        return (
        <div>
        	<h1>Welcome to {this.props.title}</h1>
        	<Link to = '/users/control'>
        		<button>Users</button>
        	</Link>
        	<Link to = '/realtime/show'>
        		<button>Realtime</button>
        	</Link>
        </div>
        );
    }
}
