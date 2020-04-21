import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import { Container } from 'reactstrap';
import Posts from "./components/Posts";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import HomePage from "./components/HomePage.js";
import CreatePost from "./components/CreatePost"
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';
import RenderSinglePost from "./components/Post/RenderSinglePost";
import MyArticls from "./components/Post/MyArticls";
import User from "./components/User/User";
import CompleteUserProfile from "./components/User/CompleteUserProfile";

import './bootstrap.min.css';
import './App.css';

class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
        <div className='App'>
          <AppNavbar />
          <Switch>

           <Route exact path="/">
                <HomePage />
            </Route>

            <Route exact path="/create_post">
              <CreatePost />
            </Route>

            <Route exact path="/viewpost/:id">
              <RenderSinglePost />
            </Route>

            <Route exact path="/myarticls">
              <MyArticls />
            </Route>

            <Route exact path="/user/:username">
              <User />
            </Route>

            <Route exact path="/complete_profile/:username">
              <CompleteUserProfile />
            </Route>

          </Switch>
        </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
