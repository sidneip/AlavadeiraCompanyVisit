import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createStackNavigator } from 'react-navigation-stack';
import Main from '~/pages/Main/index';
import Login from '~/pages/Login'
import Visit from '~/pages/Visit'
import Map from '~/pages/Map'
import Visits from '~/pages/Visits'
import Logout from '~/components/Logout'
const AppStack = createDrawerNavigator(
  {
    Main: {
      screen: Main,
    }, 
    Visit: {
      screen: Visit,
      navigationOptions: {
        drawerLabel: () => null
      },
    },
    Visits: {
      screen: Visits,
    },
    Map: {
      screen: Map
    },
    Logout: {
      screen: Logout
    }
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
  }
);

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
