import React, { Component } from "react";
import { View, Text } from "native-base";

class Booking extends Component {
  state = {};

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("ride", "Booking")
    };
  };

  render() {
    console.log(this.props.navigation.getParam("date"));
    return (
      <View>
        <Text>Booking</Text>
      </View>
    );
  }
}

export default Booking;
