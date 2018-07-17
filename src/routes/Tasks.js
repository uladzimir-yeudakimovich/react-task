import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import TodoList from './TodoList';

export default class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(prevState => ({
      items: prevState.items.concat(newItem),
      text: ''
    }));
  }

  handleRemove() {
    console.log('delete');
  }

	render() {
		return (
			<div className="container">
				<h1>Tasks</h1>
				<ListGroup>
					<ListGroupItem>Task 1<button onClick={this.handleRemove}>delete</button></ListGroupItem>
					<ListGroupItem>Task 2</ListGroupItem>
					<ListGroupItem>Task 3</ListGroupItem>
					<ListGroupItem>Task 4</ListGroupItem>
					<ListGroupItem>Task 5</ListGroupItem>
					<ListGroupItem>Task 6</ListGroupItem>
					<ListGroupItem>Task 7</ListGroupItem>
					<ListGroupItem>Task 8</ListGroupItem>
					<ListGroupItem>Task 9</ListGroupItem>
          <ListGroupItem>Task 10</ListGroupItem>
          <TodoList items={this.state.items} />
        </ListGroup>

        <form onSubmit={this.handleSubmit}>
          <input
            id="new-todo"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button className="btn-primary">Add</button>
        </form>
			</div>
		);
}
}
