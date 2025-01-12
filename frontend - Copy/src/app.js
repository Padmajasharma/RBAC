import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Home from './pages/Home';
import Admin from './pages/Admin';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <Router>
      <div>
        {!token ? (
          <div>
            <LoginForm setToken={setToken} />
            <SignupForm />
          </div>
        ) : (
          <Switch>
            <Route path="/admin" component={Admin} />
            <Route path="/" component={Home} />
          </Switch>
        )}
      </div>
    </Router>
  );
};

export default App;
