import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { FirebaseAppProvider, AuthCheck } from 'reactfire';
import { Home, Book, About, Library, SignIn } from './components'
import {firebaseConfig} from './firebaseConfig';
import 'firebase/auth';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import './style.css';
let myTitle = "Diamond Car Keepers"

ReactDOM.render(
  <React.StrictMode>
  <FirebaseAppProvider firebaseConfig={firebaseConfig} suspense={true}>
  <Provider store={store}>
    <Router>
      <Switch>

        <Route exact path="/">
          <Home title={myTitle} />
        </Route>
        <Route path='/library'>
          <Library></Library>
        </Route>
        <Route path='/books'>
          <Book></Book>
        </Route>
        <Route path='/about'>
          <About></About>
        </Route>
        <Route path='signin'>
          <SignIn></SignIn>
        </Route>

      </Switch>

    </Router>
    </Provider>
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
