import React from 'react';
import { FormControl}  from "react-bootstrap";

export default class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      isManager: false,
      isDeveloper: false,
    };
  }

  onChange = (e) => {
    const value = e.target.checked === undefined ? e.target.value: e.target.checked;
    this.setState({
      [e.target.name]: value,
    })
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
      </div>
    );
  }
}

