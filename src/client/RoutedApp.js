import React from 'react';
import {LoginForm} from "./Login";
import RestorePasswordScreen from "./RestorePassword";
import EmailApp from "./EmailApp";
import {BrowserRouter, Switch, Router, Route} from "react-router-dom";

class RoutedApp extends React.Component {

    render() {
        return (<BrowserRouter>
            <Switch>
                <Route exact path="/" component={LoginForm}/>
                <Route path="/forgotten" component={RestorePasswordScreen}/>
                <Route path="/mail" component={EmailApp}/>
            </Switch>
        </BrowserRouter>);
    }
}

export default RoutedApp;