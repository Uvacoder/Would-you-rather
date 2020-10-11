import React, { Component } from "react";
import { Stack, Heading, Text } from "@chakra-ui/core";

export class Error extends Component {
  render() {
    return (
      <Stack textAlign="center">
        <Heading as="h3">404 Error</Heading>
        <Text>Oops you've managed to land somewhere you shouldn't</Text>
      </Stack>
    );
  }
}

export default Error;
