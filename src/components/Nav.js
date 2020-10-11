import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Flex, Box, Avatar, Text } from "@chakra-ui/core";

import { setAuthUser } from "../actions/authUser";

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

class Nav extends Component {
  handleLogout = (e) => {
    e.preventDefault();
    this.props.setAuthUser(null);
  };

  render() {
    const { authUser, users } = this.props;
    return (
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1.5rem"
        bg="teal.500"
        color="white"
      >
        <Box
          display={{ md: "flex" }}
          width={{ sm: "full", md: "auto" }}
          alignItems="center"
          flexGrow={1}
        >
          <NavLink to="/">
            <MenuItems>Home</MenuItems>
          </NavLink>
          <NavLink to="/add">
            <MenuItems>New Poll</MenuItems>
          </NavLink>
          <NavLink to="/leaderboard">
            <MenuItems>Leaderboard</MenuItems>
          </NavLink>
        </Box>

        <Box display="flex">
          <Avatar
            mx={4}
            size="md"
            name={users[authUser].name}
            src={users[authUser].avatarURL}
          />
          <Text mt={2}>{users[authUser].name}</Text>
          <Button
            mx={6}
            mb={2}
            variantColor="white"
            variant="link"
            onClick={this.handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Flex>
    );
  }
}
function mapStateToProps({ users, authUser }) {
  return {
    authUser,
    users,
  };
}

export default connect(mapStateToProps, { setAuthUser })(Nav);
