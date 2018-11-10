import * as Actions from './ActionTypes';
import fetch from 'cross-fetch';

export const requestMovies = query => ({
  type: Actions.REQUEST_MOVIES,
  payload: {
    query: query,
  },
});

export const receivedMovies = (query, movies) => ({
  type: Actions.RECEIVED_MOVIES,
  payload: {
    query: query,
    moviesList: movies,
  },
});

export const invalidateQuery = query => ({
  type: Actions.INVALIDATE_MOVIES,
  payload: {
    query: query,
  },
});

const getURLConfig = () => {
  const HOST = process.env.REACT_APP_API_HOST;
  const APIKEY = process.env.REACT_APP_API_KEY;
  return { HOST, APIKEY };
};

export const fetchMovies = query => dispatch => {
  const { HOST, APIKEY } = getURLConfig();
  const queryEncoded = encodeURI(query);
  dispatch(requestMovies(query));
  fetch(HOST + 'search/movie?api_key=' + APIKEY + '&query=' + queryEncoded)
    .then(
      response => response.json(),
      error => console.log('An error occured', error)
    )
    .then(json => {
      dispatch(receivedMovies(query, json));
    })
    .catch(err => dispatch(invalidateQuery(query)));
};

export const requestMovieDetail = movieId => ({
  type: Actions.REQUEST_MOVIE_DETAIL,
  payload: {
    movieId: movieId,
  },
});

export const receivedMovieDetail = (movieId, movieInfo) => ({
  type: Actions.RECEIVE_MOVIE_DETAIL,
  payload: {
    movieInfo: movieInfo,
    movieId: movieId,
  },
});

export const invalidateMovieDetail = movieId => ({
  type: Actions.INVALIDATE_MOVIE_DETAIL,
  payload: {
    movieId: movieId,
  },
});

export const receivedAlternateTitles = (movieId, movieTitles) => ({
  type: Actions.RECEIVE_MOVIE_ATITLES,
  payload: {
    movieId: movieId,
    movieTitles: movieTitles,
  },
});

export const invalidateAlternateTitle = movieId => ({
  type: Actions.INVALIDATE_MOVIE_ATITLES,
  payload: {
    movieId: movieId,
  },
});

export const requestingAlternateTitle = movieId => ({
  type: Actions.REQUEST_MOVIE_ATITLES,
  payload: {
    movieId: movieId,
  },
});

export const requestingReview = movieId => ({
  type: Actions.REQUEST_MOVIE_REVIEW,
  payload: {
    movieId: movieId,
  },
});

export const receivedReview = (movieId, movieReveiews) => ({
  type: Actions.RECEIVE_MOVIE_REVIEW,
  payload: {
    movieId: movieId,
    movieReview: movieReveiews,
  },
});

export const invalidateReview = movieId => ({
  type: Actions.INVALIDATE_MOVIE_REVIEW,
  payload: {
    movieId: movieId,
  },
});

export const requestingCrew = movieId => ({
  type: Actions.REQUEST_MOVIE_CREW,
  payload: {
    movieId: movieId,
  },
});

export const receivedCrew = (movieId, movieCrew) => ({
  type: Actions.RECEIVE_MOVIE_CREW,
  payload: {
    movieId: movieId,
    movieCrew: movieCrew,
  },
});

export const invalidateCrew = movieId => ({
  type: Actions.INVALIDATE_MOVIE_CREW,
  payload: {
    movieId: movieId,
  },
});

export const fetchMovieDetail = id => dispatch => {
  const { HOST, APIKEY } = getURLConfig();
  dispatch(requestMovieDetail(id));
  fetch(HOST + 'movie/' + id + '?api_key=' + APIKEY)
    .then(
      response => response.json(),
      error => console.log('An error occured', error)
    )
    .then(json => {
      dispatch(receivedMovieDetail(id, json));
    })
    .catch(err => dispatch(invalidateMovieDetail(id)));

  dispatch(requestingAlternateTitle(id));
  fetch(HOST + 'movie/' + id + '/alternative_titles?api_key=' + APIKEY)
    .then(
      response => response.json(),
      error => console.log('An error has occured', error)
    )
    .then(json => {
      dispatch(receivedAlternateTitles(id, json));
    })
    .catch(err => dispatch(invalidateAlternateTitle(id)));

  dispatch(requestingReview(id));
  fetch(HOST + 'movie/' + id + '/reviews?api_key=' + APIKEY)
    .then(
      response => response.json(),
      error => console.log('An error has occured', error)
    )
    .then(json => {
      dispatch(receivedReview(id, json));
    })
    .catch(err => dispatch(invalidateReview(id)));

  dispatch(requestingCrew(id));
  fetch(HOST + 'movie/' + id + '/credits?api_key=' + APIKEY)
    .then(
      response => response.json(),
      error => console.log('An error has occured', error)
    )
    .then(json => {
      dispatch(receivedCrew(id, json));
    })
    .catch(err => dispatch(invalidateCrew(id)));
};
