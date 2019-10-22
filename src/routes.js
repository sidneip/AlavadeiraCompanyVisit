import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack';
import Main from '~/pages/Main/index';
import Login from '~/pages/Login'
import Visit from '~/pages/Visit'

const AppStack = createStackNavigator({
  Main: {screen: Main}, 
  Visit: {screen: Visit, navigationOptions:  {header: null}}
});

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
