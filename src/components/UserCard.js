import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PollQuestion from "./PollQuestion";
import PollResult from "./PollResult";
import PollTeaser from "./PollTeaser";

import { Heading, Avatar, SimpleGrid, Stack } from "@chakra-ui/core";

const pollTypes = {
  POLL_TEASER: "POLL_TEASER",
  POLL_QUESTION: "POLL_QUESTION",
  POLL_RESULT: "POLL_RESULT",
};

const PollContent = (props) => {
  const { pollType, question, unanswered } = props;

  switch (pollType) {
    case pollTypes.POLL_TEASER:
      return <PollTeaser question={question} unanswered={unanswered} />;
    case pollTypes.POLL_QUESTION:
      return <PollQuestion question={question} />;
    case pollTypes.POLL_RESULT:
      return <PollResult question={question} />;
    default:
      return;
  }
};

export class UserCard extends Component {
  static propTypes = {
    question: PropTypes.object,
    author: PropTypes.object,
    pollType: PropTypes.string,
    unanswered: PropTypes.bool,
    question_id: PropTypes.string,
  };
  render() {
    const {
      author,
      question,
      pollType,
      badPath,
      unanswered = null,
    } = this.props;

    if (badPath === true) {
      return <Redirect to="/questions/bad_id" />;
    }

    return (
      <SimpleGrid columns={1}>
        <Stack isInline spacing={8} align="center">
          <Avatar mx={4} size="md" name={author.name} src={author.avatarURL} />
          <Heading textAlign="center" as="h5" size="lg">
            {author.name} asks:
          </Heading>
        </Stack>
        <PollContent
          pollType={pollType}
          question={question}
          unanswered={unanswered}
        />
      </SimpleGrid>
    );
  }
}

function mapStateToProps(
  { users, questions, authUser },
  { match, question_id }
) {
  let question,
    author,
    pollType,
    badPath = false;
  if (question_id !== undefined) {
    question = questions[question_id];
    author = users[question.author];
    pollType = pollTypes.POLL_TEASER;
  } else {
    const { question_id } = match.params;
    question = questions[question_id];
    const user = users[authUser];

    if (question === undefined) {
      badPath = true;
    } else {
      author = users[question.author];
      pollType = pollTypes.POLL_QUESTION;
      if (Object.keys(user.answers).includes(question.id)) {
        pollType = pollTypes.POLL_RESULT;
      }
    }
  }

  return {
    badPath,
    question,
    author,
    pollType,
  };
}

export default connect(mapStateToProps)(UserCard);
