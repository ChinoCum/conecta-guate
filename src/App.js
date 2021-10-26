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
const Tracking = React.lazy(() => import('./views/pages/tracking/Tracking'));
const Mensajeria = React.lazy(() => import('./views/pages/mensajeria/Mensajeria'))

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
                <Route exact path="/mensajeria-corporativa" name="Mensajeria Corporativa" render={props => <Mensajeria {...props}/>} />
                <Route exact path="/login" name="Login" render={props => <Login {...props}/>} />
                <Route exact path="/register" name="Register" render={props => <Register {...props}/>} />
                <Route path="/creacion-pedido" name="Creacion de Pedido" render={props => <TheLayout {...props}/>} />
                <Route path="/cuenta/perfil" name="Perfil" render={props => <TheLayout {...props}/>} />
                <Route path="/cuenta/password" name="Password" render={props => <TheLayout {...props}/>} />
                <Route path="/cuenta/recibos" name="Recibos" render={props => <TheLayout {...props}/>} />
                <Route path="/mis-envios" name="Mis Envios" render={props => <TheLayout {...props}/>} />
                <Route path="/planes-disponibles" name="Planes Disponibles" render={props => <TheLayout {...props}/>} />
                <Route path="/coberturas" name="Coberturas" render={props => <TheLayout {...props}/>} />
                <Route path="/recomendaciones" name="Recomendaciones" render={props => <TheLayout {...props}/>} />
                <Route path="/tracking/:id" name="Tracking Page" render={props => <Tracking {...props}/>} />
              </Switch>
            </React.Suspense>
        </HashRouter>
      </ToastProvider>
    );
  }
}

export default App;
