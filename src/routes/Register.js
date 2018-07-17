import React from 'react';
import { FormControl, Checkbox, Button }  from "react-bootstrap";

export default class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      isManager: false
    };
  }

  onChange(e) {
    if (e.target.name === 'isManager') {
      this.setState({
        [e.target.name]: e.target.checked
      })
    } else {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }

  onSubmit() {
    const data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      isManager: this.state.isManager
    }
    console.log(data)
    // fetch("/", {
    //   method: 'POST',
    //   headers: {'Content-Type': 'application/json'},
    //   body: JSON.stringify(data)
    // }).then(function(response) {
    //   if (response.status >= 400) {
    //     throw new Error("Bad response from server");
    //   }
    //   return response.json();
    // }).then(function(data) {
    //   console.log(data)
    //   if(data == "success"){
    //     this.setState({msg: "Thanks for registering"});
    //   }
    // }).catch(function(err) {
    //   console.log(err)
    // });
  }

  render() {
    return (
      <form className="container">
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
          className="btn-primary"
          onClick={() => this.onSubmit()}
        >
          Submit
        </Button>
      </form>
    );
  }
}

