/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
// import App from './App';
import RootApp from './src/RootApp'
import {name as appName} from './app.json';
LogBox.ignoreLogs(['Remote debugger']);
AppRegistry.registerComponent(appName, () => RootApp);
