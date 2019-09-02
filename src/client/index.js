import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'font-awesome/css/font-awesome.min.css';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import RoutedApp from "./RoutedApp";

ReactDOM.render(<RoutedApp/>, document.getElementById('root'));
registerServiceWorker();
