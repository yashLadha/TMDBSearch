import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  CardActionArea,
  CardMedia,
} from '@material-ui/core';
import { fetchMovieDetail } from '../redux/Actions';
import { withRouter, NavLink } from 'react-router-dom';

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMovieDetail: movieId => {
      dispatch(fetchMovieDetail(movieId));
    },
  };
};

const style = theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    maxWidth: 320,
  },
  cardContent: {
    height: 90,
    textAlign: 'center',
  },
  grid: {
    maxWidth: 720,
    margin: '8px auto',
  },
  media: {
    objectFit: 'cover',
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
  progRoot: {
    maxWidth: 60,
    margin: '0 auto',
  },
});

class MovieGrid extends Component {
  render() {
    const { isReceived, isRequesting, movieList, classes } = this.props;

    if (isReceived === true) {
      const inflateMovies = movieList.results.map(movie => {
        let posterLink;
        if (movie.poster_path !== null)
          posterLink = process.env.REACT_APP_POSTER_BASE + movie.poster_path;
        else
          posterLink =
            'https://www.seattletaekwondo.com/wp-content/uploads/2017/04/default-image.jpg';
        const detailLink = '/' + movie.id;
        return (
          <Grid item key={movie.id} xs={12} md={4}>
            <NavLink
              to={detailLink}
              activeStyle={{
                textDecoration: 'none',
                color: 'black',
              }}
            >
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    height="140"
                    component="img"
                    alt={movie.title}
                    className={classes.media}
                    title={movie.title}
                    image={posterLink}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography>{movie.title}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </NavLink>
          </Grid>
        );
      });
      return (
        <div className={classes.root}>
          <Grid className={classes.grid} container spacing={16}>
            {inflateMovies}
          </Grid>
        </div>
      );
    } else if (isRequesting === true) {
      return (
        <div className={classes.progRoot}>
          <CircularProgress className={classes.progress} size={25} />
        </div>
      );
    }
    return <div />;
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(style)(MovieGrid))
);
