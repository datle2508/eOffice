/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import LoginForm from './Components/LoginForm';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => LoginForm);
