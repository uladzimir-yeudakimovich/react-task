import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import TodoList from './TodoList';

export default class Projects extends React.Component {
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

  render() {
    return (
      <div className="container">
        <h1>Projects</h1>
        <ListGroup>
          <ListGroupItem>Project 1</ListGroupItem>
          <ListGroupItem>Project 2</ListGroupItem>
          <ListGroupItem>Project 3</ListGroupItem>
          <ListGroupItem>Project 4</ListGroupItem>
          <ListGroupItem>Project 5</ListGroupItem>
          <ListGroupItem>Project 5</ListGroupItem>
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

