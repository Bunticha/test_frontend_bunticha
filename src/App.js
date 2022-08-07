// This is the main Component which draws the tool bar and has route placeholders for other components.

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HomeComponent from './components/HomeComponent';
import SuccessContainer from './containers/SuccessContainer';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

const styles = {
  root: {
    flexGrow: 1,
  }
};


class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <Router>
        <div className={classes.root}>
          <AppBar position="static" color="secondary">
            <Toolbar>
              <Typography variant="title" className="title" color="inherit">
                Little Brown Book Shop
              </Typography>
            </Toolbar>
          </AppBar>
          <Grid style={{ position: "relative", top: "10px", left: "1px" }} >
            <Grid item xs={12} md={12} xl={1} >
              <Card>
                <Toolbar>
                  <Typography variant="h4" className="title" color="primary" align="right">
                    ****special discount only for all Harry Potter book series (7 books)****
                    <br />buy 2 unique series books discount 10% of those 2 books
                    <br />buy 3 unique series books discount 11% of those 3 books
                    <br />buy 4 unique series books discount 12% of those 4 books
                    <br />buy 5 unique series books discount 13% of those 5 books
                    <br />buy 6 unique series books discount 14% of those 6 books
                    <br />buy 7 unique series books discount 15% of those 7 books
                  </Typography>
                </Toolbar>
              </Card>
            </Grid>
          </Grid>
          <Route exact path="/" component={HomeComponent} />
          <Route path="/success" component={SuccessContainer} />
        </div>
      </Router>
    );
  }
}

export default withStyles(styles)(App);
