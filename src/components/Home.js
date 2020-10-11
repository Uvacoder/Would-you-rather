import React, { Component } from "react";

import PropTypes from "prop-types";

import { connect } from "react-redux";

import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/core";

import UserCard from "./UserCard";

export class Home extends Component {
  static propType = {
    userQuestionData: PropTypes.object.isRequired,
  };

  render() {
    const { userQuestionData } = this.props;

    return (
      <Box
        shadow="md"
        borderWidth="1px"
        d="flex"
        width="75%"
        mt={8}
        mx="auto"
        flexDirection="column"
        alignItems="center"
        justify="center"
      >
        <Tabs width="75%" isFitted>
          <TabList mb="0.5m">
            <Tab>Unanswered</Tab>
            <Tab>Answered</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {userQuestionData.answered.map((question) => (
                <UserCard
                  key={question.id}
                  question_id={question.id}
                  unanswered={true}
                />
              ))}
            </TabPanel>
            <TabPanel>
              {userQuestionData.unanswered.map((question) => (
                <UserCard
                  key={question.id}
                  question_id={question.id}
                  unanswered={false}
                />
              ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    );
  }
}
function mapStateToProps({ authUser, users, questions }) {
  const answeredIds = Object.keys(users[authUser].answers);
  const answered = Object.values(questions)
    .filter((question) => !answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);
  const unanswered = Object.values(questions)
    .filter((question) => answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    userQuestionData: {
      answered,
      unanswered,
    },
  };
}

export default connect(mapStateToProps)(Home);
