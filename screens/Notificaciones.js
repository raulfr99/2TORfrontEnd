import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity,FlatList } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from "@react-native-community/async-storage";

export default class Notificaciones extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullData:[]
    };
  }
  async componentDidMount() {
    this.getUserData();
    var state = (await AsyncStorage.getItem("user")) == "false";
    if (state) {
      this.getNotificationsAlumno(await AsyncStorage.getItem("id"));
    } else {
      this.getNotificationsTutor(await AsyncStorage.getItem("id"));
    }
    
  }

  getNotificationsTutor(id) {
    const endPoint =
      "http://2tor-pruebas.eba-39fqbkdu.us-west-1.elasticbeanstalk.com/auth/get-notifications-2tor/";

    let collection = {};
    collection.id_2tor = id;

    fetch(endPoint, {
      method: "POST", // or 'PUT'
      body: JSON.stringify(collection), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((resJson) => {
        this.setState({
          fullData: resJson.notifications,
        });
      })
      .catch((error) => {
        this.setState({ error, loading: false });
      });
  }
  getNotificationsAlumno(id) {
    const endPoint =
      "http://2tor-pruebas.eba-39fqbkdu.us-west-1.elasticbeanstalk.com/auth/get-notifications-alumno/";

    let collection = {};
    collection.id_alumno = id;

    fetch(endPoint, {
      method: "POST", // or 'PUT'
      body: JSON.stringify(collection), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((resJson) => {
        this.setState({
          fullData: resJson.notifications,
        });
      })
      .catch((error) => {
        this.setState({ error, loading: false });
      });
  }
  getUserData = async () => {
    this.setState({ id: await AsyncStorage.getItem("id") });
    this.setState({ user: await AsyncStorage.getItem("user") });
  };

  _renderItem = ({ item, index }) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.card}
        >
          <Icon name="bell" size={20} color='#40E29F' />
          <Text>{item.notification}</Text>
          <Icon name="chevron-down" size={10}  />
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        
        <FlatList
          style={styles.container}
          data={this.state.fullData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this._renderItem}
        />
        <View style={styles.metodoView}>
          <Image
            source={require("../assets/logo.png")}
            style={styles.metodoIcon}
          />
          <Text style={styles.metodoText}>2TOR agrega un metodo de pago</Text>
        </View>

        <View style={styles.startView}>
          <Text style={styles.startText}>Bienvenido a 2TOR!</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  startView: {
    backgroundColor: "#40E29F",
    width: "100%",
    height: "20%",
    justifyContent: "center",
  },
  startText: {
    color: "white",
    padding: 20,
    fontSize: 20,
    alignSelf: "center",
    fontWeight: "bold",
  },
  metodoView: {
    marginTop: "20%",
    backgroundColor: "white",
    width: "100%",
    height: "20%",
    justifyContent: "center",
    flexDirection: "row",
  },
  metodoText: {
    padding: 20,
    fontSize: 15,
    alignSelf: "center",
  },
  metodoIcon: {
    width: 30,
    height: 30,
    alignSelf: "center",
  },
  card: {
    width: "100%",
    padding: 15,
    backgroundColor: "white",
    alignContent: "center",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    
    
  },
  imgAvatar: {
    width: 30,
    height: 30,
  },
});
