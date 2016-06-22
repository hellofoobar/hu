import React from 'react';

export default class HelloWorld extends React.Component {
	static displayName = 'HelloWorld';

	static propTypes = {
		title: React.PropTypes.string.isRequired,
    };

    static defaultProps = {
        title: "huh?",
    };

    state = {
       
    };

    constructor(props) {
        super(props);
        
    }
    render() {
        return <h1>hello world from {this.props.title}</h1>;
    }
}
