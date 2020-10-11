import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import {
  Stack,
  CircularProgressLabel,
  CircularProgress,
  Text,
  Button,
  Badge,
  Box,
  Divider,
} from "@chakra-ui/core";

export class PollResult extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  };
  handleClick = () => {
    this.props.history.push("/");
  };

  render() {
    const { question, user } = this.props;
    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const votesTotal = optionOneVotes + optionTwoVotes;
    const userVote = user.answers[question.id];
    return (
      <Box mb={8}>
        <Stack justify="center">
          <Text fontSize="2xl" textAlign="center" as="h3">
            Would you rather?
          </Text>
          <Text fontSize="xl" textAlign="center" as="h5">
            Results:
          </Text>
        </Stack>
        <Stack>
          <Box
            shadow="md"
            borderWidth="1px"
            d="flex"
            width="50%"
            mx="auto"
            flexDirection="column"
            alignItems="center"
            justify="center"
          >
            <Text fontWeight="bold" textAlign="center">
              {question.optionOne.text}
              {userVote === "optionOne" && (
                <Badge ml="1" variantColor="green">
                  Your Vote
                </Badge>
              )}
            </Text>
            <CircularProgress
              size="100px"
              thickness={0.1}
              align="center"
              justify="center"
              value={((optionOneVotes / votesTotal) * 100).toFixed(2)}
            >
              <CircularProgressLabel>
                {((optionOneVotes / votesTotal) * 100).toFixed(2)}%
              </CircularProgressLabel>
            </CircularProgress>
            <Text>
              {optionOneVotes} out of {votesTotal} votes
            </Text>
            <Divider />
            <Text fontWeight="bold" textAlign="center">
              {question.optionTwo.text}
              {userVote === "optionTwo" && (
                <Badge ml="1" variantColor="green">
                  Your Vote
                </Badge>
              )}
            </Text>
            <CircularProgress
              size="100px"
              thickness={0.1}
              align="center"
              color="green"
              justify="center"
              value={((optionTwoVotes / votesTotal) * 100).toFixed(2)}
            >
              <CircularProgressLabel>
                {((optionTwoVotes / votesTotal) * 100).toFixed(2)}%
              </CircularProgressLabel>
            </CircularProgress>
            <Text>
              {optionTwoVotes} out of {votesTotal} votes
            </Text>
            <Button
              width="50%"
              my={8}
              variantColor="teal"
              variant="outline"
              onClick={this.handleClick}
            >
              {" "}
              Back
            </Button>
          </Box>
        </Stack>
      </Box>
    );
  }
}
function mapStateToProps({ users, authUser }) {
  const user = users[authUser];
  return {
    user,
  };
}

export default withRouter(connect(mapStateToProps)(PollResult));
