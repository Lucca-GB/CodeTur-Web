import React from 'react';
import ReactDOM from 'react-dom';

import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';

import Login from './paginas/conta/login';
import ResetarSenha from './paginas/conta/resetarsenha';
import DashBoard from './paginas/admin/dashboard';
import Pacote from './paginas/admin/pacotes';
import NotFound from './paginas/notfound';
import jwt_decode from 'jwt-decode';
import { ToastProvider } from 'react-toast-notifications';


const RotaPrivadaAdmin = ({component : Component, ...rest}) => (
  <Route 
    {...rest}
    render = { props => 
        localStorage.getItem('token-codetur') !== null && jwt_decode(localStorage.getItem('token-codetur')).role === 'Admin' ? 
          (<Component {...props} />) : 
          (<Redirect to={{ pathname :'/login', state :{from : props.location}}} />)
    }
  />
);

const rotas = (
  <Router>
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/conta/resetar-senha" component={ResetarSenha} />
      <RotaPrivadaAdmin path="/admin" exact component={DashBoard} />
      <RotaPrivadaAdmin path="/admin/pacote" component={Pacote} />
      <Route component={NotFound} />
    </Switch>
  </Router>
)

ReactDOM.render(
  <ToastProvider>
    {rotas}
    </ToastProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
