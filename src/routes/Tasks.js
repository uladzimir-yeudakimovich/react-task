import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

export default class Tasks extends React.Component {
    constructor() {
        super();
        this.state = {
            id: '',
            task: ''
        }
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

	render() {
		return (
			<div className="container">
				<h1>Tasks</h1>
				<ListGroup>
					<ListGroupItem>Task 1</ListGroupItem>
					<ListGroupItem>Task 2</ListGroupItem>
					<ListGroupItem>Task 3</ListGroupItem>
					<ListGroupItem>Task 4</ListGroupItem>
					<ListGroupItem>Task 5</ListGroupItem>
					<ListGroupItem>Task 6</ListGroupItem>
					<ListGroupItem>Task 7</ListGroupItem>
					<ListGroupItem>Task 8</ListGroupItem>
					<ListGroupItem>Task 9</ListGroupItem>
					<ListGroupItem>Task 10</ListGroupItem>
				</ListGroup>
			</div>
		);
}
}
