import React from 'react';
import $ from 'jquery';

export default class Realtime extends React.Component {
	state = {
		data: "random number incoming"
	}
    constructor(props) {
        super(props);
        this.displayName = 'Realtime';
    }
	serverRequest() {
		$.ajax({
			url: '/realtime/show/data',
			success: (data) => {
				console.log(data);
				this.setState({data: data});
			},
			error: (xhr, status, err) => {
        		console.error('/realtime/show/data', status, err.toString());
      		}
		});
		// fetch('/realtime/show/data')
		// 	// .then(response => response.json())
		//     .then(data => this.setState({ data: data }))
		//     .catch(err => console.error('/realtime/show/data', err.toString()))
	}
    componentDidMount() {
    	this.intervalId = setInterval(this.serverRequest.bind(this), 1000);
    	//this.setState({intervalId: intervalId});
    }
    componentWillUnmount() {
    	clearInterval(this.intervalId);
    	console.log("Goodnight Malaysian three seven zero");
  	}
    render() {
        return <h1>{this.state.data}</h1>;
    }
}




