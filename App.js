import React, { Component } from "react";
import { Provider } from "react-redux";
import SplashScreen from "react-native-splash-screen";
import AsyncStorage from "@react-native-community/async-storage";
import jwtDecode from "jwt-decode";

import AppNavigator from "./src/navigation/AppNavigator";
import store from "./src/store/store";
import setAuthToken from "./src/utils/setAuthToken";
import { setCurrentUser } from "./src/store/actions/authActions";

class App extends Component {
  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("jwtToken");
      if (value) {
        setAuthToken(value);
        const decoded = jwtDecode(value);
        store.dispatch(setCurrentUser(decoded));
      }
    } catch (e) {
      alert("error in reading value");
    }
  };

  componentDidMount() {
    SplashScreen.hide();
    // AsyncStorage.clear();
    this.retrieveData();
  }

  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

export default App;
