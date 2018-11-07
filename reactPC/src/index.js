import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {HashRouter as Router ,Route,Switch,NavLink} from 'react-router-dom';
import configurestore from './store/index';
import {Home,Details,Head,Footer,Classify,Cart,Ordernum,Orderpage} from './compoment';


const store= configurestore().store;
ReactDOM.render(   
    <Provider store={store}>
    <Router>
        <div>
            <Head/>
            <Switch>
                <Route path="/" component={Home} exact> </Route>
                <Route path="/details/:id" component={Details}></Route>
                <Route path="/classify/:type" component={Classify} exact> </Route>
                <Route path="/cart" component={Cart}> </Route>
                <Route path="/order" component={Ordernum}> </Route>
                <Route path="/orderpage" component={Orderpage}> </Route>
            </Switch>
            <Footer/>
        </div>
    </Router>
    </Provider>

,document.getElementById('app')); 
