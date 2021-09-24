import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { ToastProvider, useToasts } from 'react-toast-notifications';
import './scss/style.scss';
import './index.css'


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Home = React.lazy(() => import('./views/pages/home/Home'));

class App extends Component {

  render() {
    return (
      <ToastProvider 
        position="bottom-center"
        reverseOrder={false}
        >
        <HashRouter>
            <React.Suspense fallback={loading}>
              <Switch>
                <Route exact path="/" name="Home Page" render={props => <Home {...props}/>} />
                <Route exact path="/login" name="Login" render={props => <Login {...props}/>} />
                <Route exact path="/register" name="Register" render={props => <Register {...props}/>} />
                <Route path="/creacion-pedido" name="Creacion de Pedido" render={props => <TheLayout {...props}/>} />
              </Switch>
            </React.Suspense>
        </HashRouter>
      </ToastProvider>
    );
  }
}

export default App;
