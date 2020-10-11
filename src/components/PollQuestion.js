import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { handleSaveQuestionAnswer } from "../actions/users";
import {
  FormControl,
  Heading,
  RadioGroup,
  Radio,
  Stack,
  Button,
  Flex,
} from "@chakra-ui/core";
export class PollQuestion extends Component {
  static propTypes = {
    authUser: PropTypes.string.isRequired,
    handleSaveQuestionAnswer: PropTypes.func.isRequired,
    question: PropTypes.object.isRequired,
  };
  state = {
    value: "",
  };
  onChange = (e) => {
    console.log(e);
    this.setState({ value: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.value !== "") {
      const { authUser, question, handleSaveQuestionAnswer } = this.props;
      handleSaveQuestionAnswer(authUser, question.id, this.state.value);
    }
  };

  render() {
    const { question } = this.props;
    const disabled = this.state.value === "" ? true : false;

    return (
      <Stack mt={16} align="center" justify="center">
        <Heading as="h3" fontSize="xl">
          Would you rather?
        </Heading>
        <Flex
          align="center"
          justify="center"
          p={5}
          mx="auto"
          shadow="md"
          borderWidth="1px"
          width="75%"
        >
          <form onSubmit={this.handleSubmit}>
            <FormControl as="fieldset">
              <Flex align="center" justify="center" mx="auto">
                <RadioGroup
                  isInline
                  spacing={8}
                  mb={8}
                  size="lg"
                  variantColor="red"
                  onChange={this.onChange}
                >
                  <Radio value="optionOne" label={question.optionOne.text}>
                    {question.optionOne.text}
                  </Radio>
                  <Radio value="optionTwo" label={question.optionTwo.text}>
                    {question.optionTwo.text}
                  </Radio>
                </RadioGroup>
              </Flex>
              <Button
                mt={4}
                variantColor="blue"
                variant="outline"
                width="100%"
                disabled={disabled}
                type="submit"
              >
                Submit
              </Button>
            </FormControl>
          </form>
        </Flex>
      </Stack>
    );
  }
}

function mapStateToProps({ authUser }, { match }) {
  return {
    authUser,
  };
}

export default connect(mapStateToProps, { handleSaveQuestionAnswer })(
  PollQuestion
);
