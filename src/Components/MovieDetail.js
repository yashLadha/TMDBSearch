import { Chip, CircularProgress, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchMovieDetail } from '../redux/Actions';

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
    maxWidth: 720,
    margin: '0 auto',
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
  progRoot: {
    maxWidth: 150,
    textAlign: 'center',
    margin: '0 auto',
  },
  chip: {
    margin: theme.spacing.unit,
  },
  scrollReview: {
    width: '100%',
    height: 150,
    overflowY: 'scroll',
    overFlowX: 'hidden',
  },
});

class MovieDetail extends Component {
  componentWillMount() {
    this.props.fetchMovieDetail(this.props.match.params.id);
  }

  render() {
    const {
      classes,
      isMovieDetailReceived,
      movieDetail,
      isAtitleReceive,
      movieAtitles,
      movieReviews,
      movieCrew,
    } = this.props;

    let modalDetail;
    let populateAlternativeTitles;

    if (isAtitleReceive === true) {
      let counter = 0;
      populateAlternativeTitles = movieAtitles.map(title => {
        counter++;
        return (
          <Chip key={counter} className={classes.chip} label={title.title} />
        );
      });
    } else {
      populateAlternativeTitles = (
        <div className={classes.progRoot}>
          Fetching alt. titles
          <CircularProgress className={classes.progress} size={25} />
        </div>
      );
    }

    let crewInflator;

    if (movieCrew.length > 0) {
      crewInflator = movieCrew.map(crew => {
        let profileURL = process.env.REACT_APP_PROFILE_BASE + crew.profile_path;
        return (
          <div key={crew.cast_id}>
            <img
              src={profileURL}
              style={{ borderRadius: '50%' }}
              title={crew.name}
              alt={crew.name}
            />
            <b>Name</b> : {crew.name} <br />
            <b>Character</b> : {crew.character} <br />
            <br />
          </div>
        );
      });
    }

    let reviewInflator;

    if (movieReviews.length > 0) {
      reviewInflator = movieReviews.map(review => {
        return (
          <div key={review.author}>
            <b>Author</b> : {review.author} <br />
            <b>Review</b> : {review.content} <br />
            <br />
          </div>
        );
      });
    }

    if (isMovieDetailReceived) {
      const backdropImageLink =
        process.env.REACT_APP_BACKDROP_BASE + movieDetail.backdrop_path;
      modalDetail = (
        <Grid container spacing={24} className={classes.root}>
          <Grid item md={12} xs={12}>
            <img
              style={{
                width: '100%',
                height: '350px',
              }}
              src={backdropImageLink}
              alt={movieDetail.title}
              title={movieDetail.title}
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <h2>{movieDetail.title}</h2>
          </Grid>
          <Grid item xs={12} md={12}>
            <b>Release Date: </b> {movieDetail.release_date}
          </Grid>
          <Grid item xs={12} md={12}>
            <h2> Alternate Titles </h2>
            {populateAlternativeTitles}
          </Grid>
          <Grid item xs={12} md={12}>
            <h2>Reviews</h2>
            <div className={classes.scrollReview}>{reviewInflator}</div>
          </Grid>
          <Grid item xs={12} md={12}>
            <h2>Crew</h2>
            <div className={classes.scrollReview}>{crewInflator}</div>
          </Grid>
        </Grid>
      );
    } else {
      modalDetail = (
        <div className={classes.progRoot}>
          <CircularProgress className={classes.progress} size={25} />
        </div>
      );
    }

    return modalDetail;
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(style)(MovieDetail))
);
