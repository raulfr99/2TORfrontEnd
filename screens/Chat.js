import AsyncStorage from "@react-native-community/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome5';
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";


export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      fullData: [],
      user: "",
    };
  }
  async componentDidMount() {
    this.getUserData();
    var state = (await AsyncStorage.getItem("user")) == "false";
    if (state) {
      this.getChatDataAlumno(await AsyncStorage.getItem("id"));
    } else {
      this.getChatDataTutor(await AsyncStorage.getItem("id"));
    }
    this.componentDidMount();
  }
  getUserData = async () => {
    this.setState({ id: await AsyncStorage.getItem("id") });
    this.setState({ user: await AsyncStorage.getItem("user") });
  };

  getChatDataTutor(id) {
    const endPoint =
      "http://2tor-pruebas.eba-39fqbkdu.us-west-1.elasticbeanstalk.com/auth/get-messages-2tor/";

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
          fullData: resJson.messages,
        });
      })
      .catch((error) => {
        this.setState({ error, loading: false });
      });
  }
  getChatDataAlumno(id) {
    const endPoint =
      "http://2tor-pruebas.eba-39fqbkdu.us-west-1.elasticbeanstalk.com/auth/get-messages-alumno/";

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
          fullData: resJson.messages,
        });
      })
      .catch((error) => {
        this.setState({ error, loading: false });
      });
  }

  _renderItem = ({ item, index }) => {
    return (
      <View style={styles.container}>
        {this.state.user === "false" ? (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              this.props.navigation.navigate("ChatMessages", { data: item })
            }
          >
            <Image
              style={styles.imgAvatar}
              source={{ uri: item.profile_photo_2tor }}
            />
            <Text>{item.name_lastname_2tor}</Text>

            <Icon name="chevron-down" size={10}  />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              this.props.navigation.navigate("ChatMessages", { data: item })
            }
          >
            <Image
              style={styles.imgAvatar}
              source={{ uri: item.profile_photo_alumno }}
            />
            <Text style={styles.nameText}>{item.name_lastname_alumno}</Text>

            <Icon name="chevron-down" size={10}  />
          </TouchableOpacity>
        )}
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
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  textTitle: {
    color: "gray",
    fontSize: 30,
    padding: 20,
  },
  cardsContainer: {
    width: "100%",
    height: "100%",

    justifyContent: "space-between",
  },
  imgAvatar: {
    width: 40,
    height: 40,
    borderRadius: 150 / 2,
    overflow: "hidden",
  },
  card: {
    width: "100%",
    padding: 15,
    backgroundColor: "white",
    alignContent: "center",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
   
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  nameText: {
    fontSize: 15,
  
  },
});
