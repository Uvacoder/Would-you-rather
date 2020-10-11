import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { Box, Button, Divider, Text } from "@chakra-ui/core";

export class PollTeaser extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
    unanswered: PropTypes.bool.isRequired,
  };
  state = {
    viewPoll: false,
  };
  handleClick = (e) => {
    this.setState((prevState) => ({
      viewPoll: !prevState.viewPoll,
    }));
  };
  render() {
    const { question, unanswered } = this.props;
    const buttonContent = unanswered === true ? "Answer Poll" : "Results";

    if (this.state.viewPoll === true) {
      return <Redirect push to={`/questions/${question.id}`} />;
    }
    return (
      <Box mb={2}>
        <Text fontSize="2xl" textAlign="center" as="h3">
          Would you rather?
        </Text>
        <Text as="h5" fontSize="md" textAlign="center">
          {question.optionOne.text}
          <br />
          or...
        </Text>
        <Button
          width="100%"
          variantColor="blue"
          variant="outline"
          onClick={this.handleClick}
        >
          {buttonContent}
        </Button>
        <Divider></Divider>
      </Box>
    );
  }
}
export default PollTeaser;
