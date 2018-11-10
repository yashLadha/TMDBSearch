import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { fetchMovies } from '../redux/Actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMovies: query => {
      dispatch(fetchMovies(query));
    },
  };
};

const style = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    margin: '32px auto',
    width: '720px',
  },
});

class SearchBar extends Component {
  state = {
    query: '',
  };

  handleQuery = e => {
    e.preventDefault();
    this.props.fetchMovies(this.state.query);
  };

  handleChange = query => e => {
    this.setState({
      [query]: e.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <form
        className={classes.container}
        noValidate
        autoComplete="off"
        onSubmit={this.handleQuery}
      >
        <TextField
          id="outlined-query-input"
          label="Query"
          className={classes.textField}
          type="text"
          value={this.state.query}
          onChange={this.handleChange('query')}
          name="query"
          margin="normal"
          variant="outlined"
        />
      </form>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(style)(SearchBar))
);
