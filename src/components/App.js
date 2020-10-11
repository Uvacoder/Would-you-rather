import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Flex, Box } from "@chakra-ui/core";
import { handleInitialData } from "../actions/shared";
import { connect } from "react-redux";
import Login from "./Login";
import Nav from "./Nav";
import Home from "./Home";
import UserCard from "./UserCard";
import NewPoll from "./NewPoll";
import Leaderboard from "./Leaderboard";
import Error from "./Error";

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    const { authUser } = this.props;
    return (
      <Router>
        <div className="App">
          {authUser === null ? (
            <Route
              render={() => (
                <ContentGrid>
                  <Login />
                </ContentGrid>
              )}
            />
          ) : (
            <>
              <Nav />
              <ContentGrid>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/questions/bad_id" component={Error} />
                  <Route path="/questions/:question_id" component={UserCard} />
                  <Route path="/add" component={NewPoll} />
                  <Route path="/leaderboard" component={Leaderboard} />
                  <Route component={Error} />
                </Switch>
              </ContentGrid>
            </>
          )}
        </div>
      </Router>
    );
  }
}
const ContentGrid = ({ children }) => (
  <Flex as="main" justify="center" align="center">
    <Box
      justifyContent="center"
      width="900px"
      flexDirection="column"
      alignItems="flex-start"
      m="0 auto 0 auto"
    >
      {children}
    </Box>
  </Flex>
);
function mapStateToProps({ authUser }) {
  return {
    authUser,
  };
}

export default connect(mapStateToProps, { handleInitialData })(App);
