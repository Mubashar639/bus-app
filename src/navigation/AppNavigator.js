import { createStackNavigator, createAppContainer } from "react-navigation";

import HomeScreen from "../screens/Home";
import DetailScreen from "../screens/Detail";
import BookingScreen from "../screens/Booking";
import AuthScreen from "../screens/AuthScreen";
import BussesScreen from "../screens/Busses";
import UserChat from '../screens/UserChat';

const StackNavigation = createStackNavigator(
  {
    Home: HomeScreen,
    Detail: DetailScreen,
    Booking: BookingScreen,
    Auth: AuthScreen,
    Busses: BussesScreen,
    UserChat
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#403E3E"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

const AppNavigator = createAppContainer(StackNavigation);

export default AppNavigator;
