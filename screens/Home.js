import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Card, ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      id: "",
      searchesCount: "",
      busquedaReciente: "",
      fullData: [],
    };
  }
  async componentDidMount() {
    this.getProfileData();
    if ((await AsyncStorage.getItem("user")) === "true") {
      this.getSearchesCount(await AsyncStorage.getItem("id"));
    } else {
    }
  }

  getProfileData = async () => {
    this.setState({ user: await AsyncStorage.getItem("user") });
    this.setState({ id: await AsyncStorage.getItem("id") });
    if ((await AsyncStorage.getItem("busquedaReciente")) == null) {
    } else {
      this.getData(await AsyncStorage.getItem("busquedaReciente"));
      this.getDataR(await AsyncStorage.getItem("busquedaReciente"));
    }
  };
  getSearchesCount(id) {
    endPoint =
      "http://2tor-pruebas.eba-39fqbkdu.us-west-1.elasticbeanstalk.com/auth/count-searches/";

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
          searchesCount: resJson.searches,
        });
      })
      .catch((error) => {
        this.setState({ error, loading: false });
      });
  }

  getData = (search) => {
    const endPoint =
      "http://2tor-pruebas.eba-39fqbkdu.us-west-1.elasticbeanstalk.com/auth/busqueda/";

    let collection = {};
    (collection.search = search), (collection.api_data = 1);

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
          fullData: resJson.api_data,
        });
      })
      .catch((error) => {
        this.setState({ error, loading: false });
      });
    console.log("x:" + this.state.data);
  };

  _renderItem = ({ item, index }) => {
    console.log(item);
    return (
      <TouchableOpacity
        style={styles.cardHome}
        onPress={() =>
          this.props.navigation.navigate("Ofertar", { data: item })
        }
      >
        <Image style={styles.imgAvatar} source={{ uri: item.profile_photo }} />
        <Text>{item.name_lastname}</Text>

        <Text style={{ color: "gray" }}>{item.tags}</Text>
      </TouchableOpacity>
    );
  };
  _renderItemR = ({ item, index }) => {
    console.log(item);
    return (
      <TouchableOpacity
        style={styles.cardClasses}
        onPress={() =>
          this.props.navigation.navigate("Ofertar", { data: item })
        }
      >
        <Image source={{ uri: item.profile_photo }} style={styles.metodoIcon} />
        <View>
          <Text>{item.name_lastname}</Text>
          <Text style={{ fontSize: 10 }}>{item.description}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Icon name="star" size={15} />
          <Text>4.3</Text>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        {this.state.user === "false" ? (
          <View>
            <Text style={styles.textTitle}>Para Ti:</Text>
            <View>
              <FlatList
                style={{ flex: 1 }}
                data={this.state.fullData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={this._renderItem}
                horizontal={true}
              />
            </View>
            <Text style={styles.textTitle}>Otras opciones:</Text>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-around",
                marginTop: "5%",
                height: "20%",
              }}
            >
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  width: "30%",
                  backgroundColor: "white",
                  height: "70%",
                }}
              >
                <Text style={{ alignSelf: "center" }}>Publicidad</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  width: "30%",
                  backgroundColor: "white",
                  height: "70%",
                }}
              >
                <Text style={{ alignSelf: "center" }}>Publicidad</Text>
              </TouchableOpacity>
            </View>
            <View>
              <FlatList
                style={{ flex: 1, height: "100%", height: "100%" }}
                data={this.state.fullData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={this._renderItemR}
              />
            </View>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <Text style={styles.textTitle}>Hola 2Tor!</Text>
            <Text style={styles.textSub}>Revisa tus estadisticas</Text>
            <View style={styles.searchContainer}>
              <Text style={styles.textSearch}>Han visitado tu perfil</Text>
              <Text style={styles.textSearch}>
                {this.state.searchesCount} usuario(s)
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-around",
                marginTop: "5%",
                height: "30%",
              }}
            >
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  width: "40%",
                  backgroundColor: "white",
                  height: "70%",
                }}
              >
                <Text style={{ alignSelf: "center" }}>Chats activos</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  width: "40%",
                  backgroundColor: "white",
                  height: "70%",
                }}
              >
                <Text style={{ alignSelf: "center" }}>Clases Completadas</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  width: "80%",
                  alignSelf: "center",
                  backgroundColor: "white",
                  borderRadius: 5,
                }}
              >
                <View
                  style={{
                    backgroundColor: "gray",
                    width: "100%",
                    height: "50%",
                    borderTopEndRadius: 5,
                  }}
                ></View>
                <Text style={{ alignSelf: "center" }}>Publicidad</Text>
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={require("../assets/logo.png")}
                    style={{ width: 30, height: 30, alignSelf: "center" }}
                  />
                  <Text style={{ color: "gray", padding: 10 }}>
                    {" "}
                    Nombre de la empresa
                  </Text>
                </View>
                <Text>Mensaje breve</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  textTitle: {
    color: "#636363",
    fontSize: 25,
    padding: 20,
  },
  cardsContainer: {
    width: "100%",
    height: "25%",
  },
  imgAvatar: {
    width: 60,
    height: 60,
    borderRadius: 150 / 2,
    overflow: "hidden",
  },
  cardHome: {
    backgroundColor: "white",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textSub: {
    marginLeft: "6%",
    color: "gray",
  },
  searchContainer: {
    flexDirection: "row",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 5,
    width: "90%",
    marginTop: "5%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  textSearch: {
    fontSize: 16,
    padding: 18,
    alignSelf: "center",
  },
  cardClasses: {
    flexDirection: "row",
    height: "60%",
    width: "80%",
    justifyContent: "space-around",
    borderRadius: 5,
    alignSelf: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.2,
    elevation: 1,
    padding: 5,
  },
  metodoIcon: {
    width: 50,
    height: 50,
    alignSelf: "center",
    borderRadius: 500 / 2,
  },
});
