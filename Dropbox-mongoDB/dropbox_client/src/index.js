import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Register from './components/register';
import Home from './components/Home';
import store from './reducers/index'
import User_Info from './components/user_account';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import { Router, Route, browserHistory ,hashHistory} from 'react-router';
import {BrowserRouter,Switch} from 'react-router-dom';
import setAuthorizationToken from "./utils/setAuthorizationToken";
import {setCurrentUser} from "./actions/index";
import jwt from 'jsonwebtoken';
//const history = createBrowserHistory()

//ReactDOM.render(<App />, document.getElementById('root'));
const Routes = () => (
  <div>
  <Switch>
    <Route path="/signUp" component={Register}></Route>
    <Route path="/Home" component={Home}></Route>
    <Route path="/UserInfo" component={User_Info}></Route>
    <Route path="/" component={App}></Route>
</Switch>
  </div>
)

if(localStorage.jwtToken)
{
  setAuthorizationToken(localStorage.jwtToken)
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)))
}

ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>    
    	<Routes/>    
    </BrowserRouter>
    </Provider>
    ,
    document.getElementById('root')
);
registerServiceWorker();
