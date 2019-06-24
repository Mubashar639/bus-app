import React, { Component } from "react";
import { ImageBackground } from "react-native";
import { Input, Slider } from "react-native-elements";
import { View, Text, Picker, Radio, Button } from "native-base";
import DateTimePicker from "react-native-modal-datetime-picker";

import cities from "../assets/cities";

class Detail extends Component {
  state = {
    from: "select",
    to: "select",
    seats: 1,
    address: "",
    date: "select",
    time: "select",
    type: "AC",
    isDatePickerVisible: false,
    isTimePickerVisible: false
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("ride", "Detail")
    };
  };

  onValueSubmit = () => {
    const data = {
      from: this.state.from,
      to: this.state.to,
      address: this.state.address,
      time: this.state.time,
      date: this.state.date,
      seats: this.state.seats,
      type: this.state.type
    };

    fetch("http://192.168.100.7:5000/booking/book", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(resp => {
        return resp.json();
      })
      .then(resp => {
        alert("Booking Saved");
      });
  };

  render() {
    const ride = this.props.navigation.getParam("ride");
    const cities2 = cities.filter(city => city !== this.state.from);
    return (
      <ImageBackground
        source={require("../assets/bg.jpg")}
        style={{ width: "100%", height: "100%" }}
        imageStyle={{ resizeMode: "cover" }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
            padding: 20
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ width: "30%", marginTop: 13 }}>From</Text>
            <Picker
              mode='dropdown'
              selectedValue={this.state.from}
              onValueChange={value => this.setState({ from: value })}
              style={{ width: "70%" }}
            >
              <Picker.Item label='Select Your City' value='select' />
              {cities.map((city, i) => (
                <Picker.Item label={city} value={city} key={i} />
              ))}
            </Picker>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20
            }}
          >
            <Text style={{ width: "30%", marginTop: 13 }}>To</Text>
            <Picker
              mode='dropdown'
              selectedValue={this.state.to}
              onValueChange={value => this.setState({ to: value })}
              style={{ width: "70%" }}
              enabled={this.state.from === "select" ? false : true}
            >
              <Picker.Item label='Select Your Destination' value='select' />
              {cities2.map((city, i) => (
                <Picker.Item label={city} value={city} key={i} />
              ))}
            </Picker>
          </View>
          {ride !== "Buy Ticket" ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20
              }}
            >
              <Text style={{ width: "30%", marginTop: 13 }}>Pick Up Point</Text>
              <Input
                placeholder='Type Your Full Address Here'
                onChangeText={text => this.setState({ address: text })}
                containerStyle={{ width: "70%" }}
              />
            </View>
          ) : null}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20
            }}
          >
            <Button
              transparent
              dark
              style={{ marginTop: 13 }}
              onPress={() => this.setState({ isDatePickerVisible: true })}
            >
              <Text>
                {this.state.date === "select" ? "Select Date" : this.state.date}
              </Text>
            </Button>
            <Button
              transparent
              dark
              style={{ marginTop: 13 }}
              onPress={() => this.setState({ isTimePickerVisible: true })}
            >
              <Text>
                {this.state.time === "select" ? "Select Time" : this.state.time}
              </Text>
            </Button>
            <DateTimePicker
              mode='date'
              isVisible={this.state.isDatePickerVisible}
              onConfirm={date =>
                this.setState({
                  date: date.toString().substr(4, 12),
                  isDatePickerVisible: false
                })
              }
              onCancel={() => this.setState({ isDatePickerVisible: false })}
            />
            <DateTimePicker
              mode='time'
              isVisible={this.state.isTimePickerVisible}
              onConfirm={time =>
                this.setState({
                  time: time.toString().substr(16, 8),
                  isTimePickerVisible: false
                })
              }
              onCancel={() => this.setState({ isTimePickerVisible: false })}
            />
          </View>
          {ride !== "Car" && ride !== "Rickshaw" ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20
              }}
            >
              <Text style={{ width: "30%", marginTop: 13 }}>
                Seats: {this.state.seats}
              </Text>
              <Slider
                value={this.state.seats}
                onValueChange={seats =>
                  this.setState({ seats: Math.floor(seats) })
                }
                minimumValue={1}
                maximumValue={75}
                style={{ width: "70%", marginTop: 13 }}
              />
            </View>
          ) : null}
          {ride !== "Rickshaw" && ride !== "Buy Ticket" ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Text style={{ marginRight: 20 }}>AC</Text>
              <View>
                <Radio
                  onPress={(e, v = "AC") => this.setState({ type: v })}
                  selected={this.state.type === "AC" ? true : false}
                />
              </View>
              <Text style={{ marginRight: 20, marginLeft: 20 }}>NON-AC</Text>
              <View>
                <Radio
                  onPress={(e, v = "NON-AC") => this.setState({ type: v })}
                  selected={this.state.type === "NON-AC" ? true : false}
                />
              </View>
            </View>
          ) : null}
          <Button
            onPress={
              ride === "Buy Ticket"
                ? () => this.props.navigation.navigate("Busses")
                : this.onValueSubmit
            }
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 20,
              backgroundColor: "#403E3E"
            }}
          >
            <Text> {ride === "Buy Ticket" ? "Find Bus" : "Submit"} </Text>
          </Button>
        </View>
      </ImageBackground>
    );
  }
}

export default Detail;
