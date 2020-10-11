import React, { Component } from "react";
import PropType from "prop-types";
import { connect } from "react-redux";
import {
  Icon,
  Heading,
  Stack,
  Avatar,
  Flex,
  Text,
  Divider,
} from "@chakra-ui/core";

const starColor = ["#FFD700", "#C0C0C0", "#CD7F32"];

export class Leaderboard extends Component {
  static propType = {
    leaderboardData: PropType.array.isRequired,
  };
  render() {
    const { leaderboardData } = this.props;

    return (
      <Stack mt={16} spacing={8} align="center" justify="center">
        <Heading as="h3" fontSize="2xl" textAlign="center">
          LeaderBoard
        </Heading>
        {leaderboardData.map((user, idx) => (
          <Flex
            align="center"
            justify="center"
            p={5}
            shadow="md"
            borderWidth="1px"
            width="100%"
          >
            <Avatar mx={4} size="md" name={user.name} src={user.avatarURL} />
            <Text
              wordWrap="normal"
              fontSize="lg"
              textAlign="left"
              fontWeight="bold"
            >
              {user.name}
            </Text>
            <Divider orientation="vertical" />
            <Text fontWeight="bold" textAlign="center">
              Answered questions: {user.answerCount}
            </Text>
            <Divider orientation="vertical" />
            <Text fontWeight="bold" textAlign="center">
              Created questions: {user.questionCount}{" "}
            </Text>
            <Divider orientation="vertical" />
            <Text fontWeight="bold" fontSize="lg" textAlign="center">
              Score: {user.questionCount + user.answerCount}
            </Text>
            <Icon mx="auto" name="star" size="35px" color={starColor[idx]} />
          </Flex>
        ))}
      </Stack>
    );
  }
}

function mapStateToProps({ users }) {
  const leaderboardData = Object.values(users)
    .map((user) => ({
      id: user.id,
      name: user.name,
      avatarURL: user.avatarURL,
      answerCount: Object.values(user.answers).length,
      questionCount: user.questions.length,
      total: Object.values(user.answers).length + user.questions.length,
    }))
    .sort((a, b) => a.total - b.total)
    .reverse()
    .slice(0, 3);
  return {
    leaderboardData,
  };
}

export default connect(mapStateToProps)(Leaderboard);
