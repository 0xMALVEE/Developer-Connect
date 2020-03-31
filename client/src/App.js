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

import 'bootstrap/dist/css/bootstrap.min.css';
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
            
          <Container>
           <Switch>
             <Route exact path="/">
                <HomePage />
             </Route>
            <Route exact path="/create_post">
              <CreatePost />
            </Route>
           </Switch>
          </Container>
        </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
