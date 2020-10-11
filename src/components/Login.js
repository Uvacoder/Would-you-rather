import React, { Component } from "react";
import { connect } from "react-redux";

import { Stack, Box, Button, Heading, Select } from "@chakra-ui/core";

import { setAuthUser } from "../actions/authUser";

export class Login extends Component {
  render() {
    return (
      <Stack>
        <Box
          shadow="md"
          borderWidth="1px"
          d="flex"
          width="100%"
          mt={8}
          mx="auto"
          flexDirection="column"
          alignItems="center"
          justify="center"
        >
          <LoginHeader />
          <Layout form={<ConnectedLoginForm />} />
          <footer>
            <a href="https://api.adorable.io/">
              Avatars created by using the https://api.adorable.io/
            </a>
          </footer>
        </Box>
      </Stack>
    );
  }
}

const LoginHeader = () => (
  <Box alignContent="center">
    <Heading as="h4" fontSize="xl" mt={4} textAlign="center">
      Welcome to Would you Rather!
    </Heading>
    <Heading as="h6" fontSize="lg" mt={4} textAlign="center">
      Please Sign in to play
    </Heading>
  </Box>
);

const Layout = ({ form }) => (
  <Box mx="auto" width="50%" mb={8}>
    {form}
  </Box>
);

class LoginForm extends Component {
  state = {
    value: "",
  };
  onChange = (e) => {
    this.setState({ value: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { setAuthUser } = this.props;
    const authUser = this.state.value;
    new Promise((res, rej) => {
      setTimeout(() => res(), 300);
    }).then(() => setAuthUser(authUser));
  };

  render() {
    const { value } = this.state;
    const disabled = value === "" ? true : false;
    const { users } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <Stack>
          <Select
            placeholder="Select a user"
            textAlign="center"
            onChange={this.onChange}
          >
            {users &&
              users.map((user) => (
                <option key={user.id} label={user.name} value={user.id}>
                  {user.name}
                </option>
              ))}
          </Select>
        </Stack>
        <Button mt={8} width="100%" type="submit" disabled={disabled}>
          Login
        </Button>
      </form>
    );
  }
}

const ConnectedLoginForm = connect(mapStateToProps, { setAuthUser })(LoginForm);

function mapStateToProps({ users }) {
  return {
    users: Object.values(users),
  };
}

export default Login;
