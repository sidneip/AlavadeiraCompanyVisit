import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack';
import Main from '~/pages/Main';
import Login from '~/pages/Login'

const AppStack = createStackNavigator({Main: Main});

const AuthStack = createStackNavigator({Login: {screen: Login, navigationOptions: {header: null}}})
const Routes = createAppContainer(
  createSwitchNavigator(
      { 
        App: AppStack,
        Auth: AuthStack 
      },
      {
          initialRouteName: 'Auth'
      }
  )
);

export default Routes;
