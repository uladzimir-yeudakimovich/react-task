import React from 'react';
import { FormControl, Button }  from "react-bootstrap";

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        };
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit() {
        const data = {
            username: this.state.username,
            password: this.state.password
        }
        console.log(data)
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
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={e => this.onChange(e)}
                    value={this.state.password} />
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

