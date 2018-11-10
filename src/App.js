import React, { Component } from 'react';
import SearchBar from './Components/SearchBar';
import MovieDetail from './Components/MovieDetail';
import MovieGrid from './Components/MovieGrid';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/Store';
import { Route, Switch } from 'react-router-dom';

const store = ConfigureStore();

const Home = () => {
  return (
    <div>
      <SearchBar />
      <MovieGrid />
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/:id" component={MovieDetail} />
        </Switch>
      </Provider>
    );
  }
}

export default App;
