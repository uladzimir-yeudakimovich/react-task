import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

export default class TodoList extends React.Component {
  render() {
    return (
      <ListGroup>
        {this.props.items.map(item => (
          <ListGroupItem key={item.id}>{item.text}</ListGroupItem>
        ))}
      </ListGroup>
    );
  }
}
