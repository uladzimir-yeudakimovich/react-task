import React from 'react';
import { FormControl, Checkbox, Button }  from "react-bootstrap";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export default class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      isManager: false,
    };
  }

  onChange = (e) => {
    if (e.target.name === 'isManager') {
      this.setState({
        [e.target.name]: e.target.checked,
      })
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      })
    }
  }

  onSubmit = async (e) => {
    const response = await this.props.mutate({
      variables: this.state,
    });
  }

  render() {
    return (
      <div>
        <FormControl
          name="username"
          placeholder="Username"
          onChange={e => this.onChange(e)}
          value={this.state.username} />
        <FormControl
          name="email"
          placeholder="Email"
          onChange={e => this.onChange(e)}
          value={this.state.email} />
        <FormControl
          name="password"
          placeholder="Password"
          type="password"
          onChange={e => this.onChange(e)}
          value={this.state.password} />
        <Checkbox
          name="isManager"
          checked={this.state.isManager}
          onChange={e => this.onChange(e)}
        >
          Manager?
        </Checkbox>
        <Button
          bsStyle="primary"
          onClick={() => this.onSubmit()}
        >
          Submit
        </Button>
      </div>
    );
  }
}

const mutation = gql`
  mutation($username: String, $email: String!, password: String!, $isManager: Boolean) {
    register(username: $username, email: $email, password: $password, isManager: $isManager) {
      id
    }
  }
`;

export default graphql(mutation)(Register);

