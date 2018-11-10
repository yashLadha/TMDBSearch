import * as ActionTypes from './ActionTypes';

export const Reducer = (
  state = {
    isRequesting: false,
    isReceived: false,
    isRequestInvalidated: false,

    isMovieDetailRequesting: false,
    isMovieDetailReceived: false,
    isMovieDetailInvalidated: false,

    isAtitleRequest: false,
    isAtitleReceive: false,
    isAtitleInvalidate: false,

    isReviewRequest: false,
    isReviewReceive: false,
    isReviewInvalidate: false,

    isCrewRequest: false,
    isCrewReceive: false,
    isCrewInvalidate: false,

    movieList: [],
    movieAtitles: [],
    movieReviews: [],
    movieCrew: [],
    movieDetail: '',
    queryString: '',
    movieId: 0,
    page: 1,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.REQUEST_MOVIES:
      return {
        ...state,
        isRequesting: true,
        isReceived: false,
        queryString: action.payload.query,
      };
    case ActionTypes.RECEIVED_MOVIES:
      return {
        ...state,
        isReceived: true,
        isRequesting: false,
        movieList: action.payload.moviesList,
      };
    case ActionTypes.INVALIDATE_MOVIES:
      return {
        ...state,
        isRequestInvalidated: true,
        isReceived: false,
        isRequesting: false,
        queryString: action.payload.query,
      };
    case ActionTypes.REQUEST_MOVIE_DETAIL:
      return {
        ...state,
        isMovieDetailRequesting: true,
        isMovieDetailReceived: false,
        movieId: action.payload.movieId,
      };
    case ActionTypes.RECEIVE_MOVIE_DETAIL:
      return {
        ...state,
        isMovieDetailReceived: true,
        isMovieDetailRequesting: false,
        movieId: action.payload.movieId,
        movieDetail: action.payload.movieInfo,
      };
    case ActionTypes.INVALIDATE_MOVIE_DETAIL:
      return {
        ...state,
        isMovieDetailInvalidated: true,
        isMovieDetailReceived: false,
        isMovieDetailRequesting: false,
        movieId: action.payload.movieId,
      };
    case ActionTypes.REQUEST_MOVIE_ATITLES:
      return {
        ...state,
        isAtitleRequest: true,
        isAtitleReceive: false,
        isAtitleInvalidate: false,
      };
    case ActionTypes.RECEIVE_MOVIE_ATITLES:
      return {
        ...state,
        isAtitleReceive: true,
        isAtitleRequest: false,
        isAtitleInvalidate: false,
        movieAtitles: action.payload.movieTitles.titles,
      };
    case ActionTypes.INVALIDATE_MOVIE_ATITLES:
      return {
        ...state,
        isAtitleInvalidate: true,
        isAtitleReceive: false,
        isAtitleRequest: false,
      };
    case ActionTypes.REQUEST_MOVIE_REVIEW:
      return {
        ...state,
        isReviewRequest: true,
        isReviewReceive: false,
        isReviewInvalidate: false,
      };
    case ActionTypes.RECEIVE_MOVIE_REVIEW:
      return {
        ...state,
        isReviewReceive: true,
        isReviewRequest: false,
        isReviewInvalidate: false,
        movieReviews: action.payload.movieReview.results,
        movieId: action.payload.movieId,
      };
    case ActionTypes.INVALIDATE_MOVIE_REVIEW:
      return {
        ...state,
        isReviewInvalidate: true,
        isReviewReceive: false,
        isReviewRequest: false,
        movieId: action.payload.movieId,
      };
    case ActionTypes.REQUEST_MOVIE_CREW:
      return {
        ...state,
        isCrewRequest: true,
        isCrewReceive: false,
        isCrewInvalidate: false,
      };
    case ActionTypes.RECEIVE_MOVIE_CREW:
      return {
        ...state,
        isCrewReceive: true,
        isCrewRequest: false,
        isCrewInvalidate: false,
        movieCrew: action.payload.movieCrew.cast,
        movieId: action.payload.movieId,
      };
    case ActionTypes.INVALIDATE_MOVIE_CREW:
      return {
        ...state,
        isCrewInvalidate: true,
        isCrewReceive: false,
        isCrewRequest: false,
        movieId: action.payload.movieId,
      };
    default:
      return state;
  }
};
