import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

export default class Projects extends React.Component {
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
        </ListGroup>
      </div>
    );
  }
}

