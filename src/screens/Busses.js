import React, { Component } from "react";
import { Image } from "react-native";
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Text,
  Left,
  Button
} from "native-base";

class Busses extends Component {
  state = {
    busses: []
  };

  componentDidMount() {
    fetch("http://192.168.100.32:5000/booking/vehicles")
      .then(resp => {
        return resp.json();
      })
      .then(resp => {
        this.setState({ busses: resp });
      });
  }

  render() {
    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem>
              <Body>
                <Text>Bus Name</Text>
              </Body>
            </CardItem>
            <CardItem cardBody>
              <Image
                source={{
                  uri:
                    "https://wexfordbus.com/web/app/uploads/2016/09/our-buses.jpg"
                }}
                style={{ height: 300, width: null, flex: 1 }}
              />
            </CardItem>
            <CardItem>
              <Left>
                <Button>
                  <Text>Select</Text>
                </Button>
              </Left>
            </CardItem>
          </Card>
          {this.state.busses.map((bus, i) => (
            <Card key={i}>
              <CardItem>
                <Body>
                  <Text>{bus.vehiclename}</Text>
                </Body>
              </CardItem>
              <CardItem cardBody>
                <Image
                  source={{ uri: bus.vehicleimg }}
                  style={{ height: 300, width: null, flex: 1 }}
                />
              </CardItem>
              <CardItem>
                <Left>
                  <Button>
                    <Text>Select</Text>
                  </Button>
                </Left>
              </CardItem>
            </Card>
          ))}
        </Content>
      </Container>
    );
  }
}

export default Busses;
