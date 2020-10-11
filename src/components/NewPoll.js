import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { handleSaveQuestion } from "../actions/questions";
import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  Flex,
  Stack,
  Spinner,
  Text,
} from "@chakra-ui/core";

export class NewPoll extends Component {
  static propTypes = {
    authUser: PropTypes.string.isRequired,
    handleSaveQuestion: PropTypes.func.isRequired,
  };
  state = {
    validSubmit: false,
    isLoading: false,
    option1: "",
    option2: "",
  };
  handleChange = (e) => {
    console.log(e);
    this.setState({ [e.target.id]: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { authUser, handleSaveQuestion } = this.props;
    const { option1, option2 } = this.state;

    new Promise((res, rej) => {
      this.setState({ isLoading: true });
      handleSaveQuestion(option1, option2, authUser);
      setTimeout(() => res("success"), 1000);
    }).then(() => {
      this.setState({
        option1: "",
        option2: "",
      });
      this.setState({ validSubmit: true });
    });
  };
  render() {
    const disabled = this.state.option1 === "" || this.state.option2 === "";

    if (this.state.validSubmit === true) {
      return <Redirect to="/" />;
    }
    return (
      <Stack align="center" justify="center">
        <Box mt={16} p={5} shadow="md" borderWidth="1px" width="75%">
          <Heading as="h3" fontSize="2xl" textAlign="left">
            Create a new Poll.
          </Heading>
          <Heading
            as="h5"
            mb={4}
            textAlign="center"
            fontSize="xl"
            fontWeight="600"
          >
            Complete the following question:
          </Heading>
          <Text textAlign="center" fontSize="lg">
            Would you Rather?
          </Text>
          {this.state.isLoading ? (
            <Flex justify="center" mt={8} align="center" mx="auto">
              <Spinner size="50px" />
            </Flex>
          ) : (
            <form onSubmit={this.handleSubmit}>
              <FormControl isRequired>
                <Input
                  onChange={this.handleChange}
                  id="option1"
                  value={this.state.option1}
                  placeholder="Option one"
                />
              </FormControl>
              <Text fontWeight="600" my={4}>
                or
              </Text>
              <FormControl isRequired>
                <Input
                  onChange={this.handleChange}
                  id="option2"
                  value={this.state.option2}
                  placeholder="Option two"
                />
              </FormControl>
              <Button
                variantColor="blue"
                variant="outline"
                width="100%"
                mt={4}
                type="submit"
                isDisabled={disabled}
              >
                Submit
              </Button>
            </form>
          )}
        </Box>
      </Stack>
    );
  }
}

function mapStateToProps({ authUser }) {
  return {
    authUser,
  };
}

export default connect(mapStateToProps, { handleSaveQuestion })(NewPoll);
