import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Button,
  Modal,
  TouchableHighlight,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Icon } from "react-native-elements";

export default class Ofertas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      data: [],
      modalVisible: false,
      modalData: [],
      modalContraVisible: false,
      modalContraData: [],
      price: "",
      location: "",
      user: "",
    };
  }

  setModalVisible = (visible, item) => {
    this.setState({ modalVisible: visible });
    this.setState({ modalData: item });
  };
  setModalContraVisible = (visible) => {
    this.setState({ modalContraVisible: visible });
  };
  async componentDidMount() {
    if ((await AsyncStorage.getItem("user")) === "false") {
      this.getContraOffers(await AsyncStorage.getItem("id"));
    } else {
      this.getOffers(await AsyncStorage.getItem("id"));
    }
    this.getProfileData();
  }
  getProfileData = async () => {
    this.setState({ id: await AsyncStorage.getItem("id") });
    this.setState({ user: await AsyncStorage.getItem("user") });
  };

  getOffers = (id) => {
    const endPoint =
      "http://2tor-pruebas.eba-39fqbkdu.us-west-1.elasticbeanstalk.com/auth/get-offer/";
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
          data: resJson.offers,
        });
      })
      .catch((error) => {
        this.setState({ error, loading: false });
      });
    console.log("x:" + this.state.data);
  };
  getContraOffers = (id) => {
    const endPoint =
      "http://2tor-pruebas.eba-39fqbkdu.us-west-1.elasticbeanstalk.com/auth/get-contraoffer/";
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
          data: resJson.data_contraoffer,
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
      <View>
        {item.status === "0" ? (
          <TouchableOpacity
            style={styles.offer}
            onPress={() => this.setModalVisible(true, item)}
          >
            <Text style={styles.offerText}>Oferta recibida</Text>

            <View style={styles.offerContainer}>
              <Text style={styles.firstText}>Precio ofertado:</Text>
              <Text style={styles.firstText}>Zona de clase:</Text>
            </View>
            <View style={styles.offerContainer}>
              <Text style={styles.secondText}>{item.price_hr} $</Text>
              <Text style={styles.secondText}>{item.class_zone}</Text>
            </View>
          </TouchableOpacity>
        ) : item.status === "1" ? (
          <TouchableOpacity
            style={styles.offer}
            onPress={() => this.setModalVisible(true, item)}
          >
            <Text style={styles.offerText}>Contraoferta</Text>

            <View style={styles.offerContainer}>
              <Text style={styles.firstText}>Precio ofertado:</Text>
              <Text style={styles.firstText}>Zona de clase:</Text>
            </View>
            <View style={styles.offerContainer}>
              <Text style={styles.secondText}>{item.price_hr} $</Text>
              <Text style={styles.secondText}>{item.class_zone}</Text>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };

  cancelOffer() {
    console.log("Edison: " + JSON.stringify(this.state.modalData));

    const endPoint =
      "http://2tor-pruebas.eba-39fqbkdu.us-west-1.elasticbeanstalk.com/auth/cancel-offer/";
    let collection = {};
    (collection.id_2tor = this.state.modalData.id_2tor),
      (collection.id_alumno = this.state.modalData.id_alumno),
      fetch(endPoint, {
        method: "POST", // or 'PUT'
        body: JSON.stringify(collection), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((resJson) => {
          Alert.alert("" + resJson.detail);
        })
        .catch((error) => {
          this.setState({ error, loading: false });
        });
  }

  acceptOffer() {
    console.log("Edison: " + JSON.stringify(this.state.modalData));

    const endPoint =
      "http://2tor-pruebas.eba-39fqbkdu.us-west-1.elasticbeanstalk.com/auth/offer-accepted/";
    let collection = {};
    (collection.id_2tor = this.state.modalData.id_2tor),
      (collection.id_alumno = this.state.modalData.id_alumno),
      (collection.total = this.state.modalData.total),
      fetch(endPoint, {
        method: "POST", // or 'PUT'
        body: JSON.stringify(collection), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((resJson) => {
          Alert.alert("" + resJson.detail);
        })
        .catch((error) => {
          this.setState({ error, loading: false });
        });
  }

  contraOffer() {
    console.log("Edison: " + JSON.stringify(this.state.modalData));

    const endPoint =
      "http://2tor-pruebas.eba-39fqbkdu.us-west-1.elasticbeanstalk.com/auth/create-contraoffer/";
    let collection = {};
    (collection.id_2tor = this.state.modalData.id_2tor),
      (collection.id_alumno = this.state.modalData.id_alumno),
      (collection.class_zone = this.state.location),
      (collection.price_hr = this.state.price),
      fetch(endPoint, {
        method: "POST", // or 'PUT'
        body: JSON.stringify(collection), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((resJson) => {
          Alert.alert("" + resJson.detail);
        })
        .catch((error) => {
          this.setState({ error, loading: false });
        });
  }
  acceptContraOffer() {
    console.log("Edison: " + JSON.stringify(this.state.modalData));

    const endPoint =
      "http://2tor-pruebas.eba-39fqbkdu.us-west-1.elasticbeanstalk.com/auth/contra-offer-accepted/";
    let collection = {};
    (collection.id_2tor = this.state.modalData.id_2tor),
      (collection.id_alumno = this.state.modalData.id_alumno),
      (collection.total = this.state.price),
      fetch(endPoint, {
        method: "POST", // or 'PUT'
        body: JSON.stringify(collection), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((resJson) => {
          Alert.alert("" + resJson.detail);
        })
        .catch((error) => {
          this.setState({ error, loading: false });
        });
  }
  render() {
    const { modalVisible, modalContraVisible } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>
          Tus ofertas y contraofertas iran apareciendo aqui
        </Text>

        <FlatList
          style={styles.container}
          data={this.state.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this._renderItem}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.firstContainer}>
                <Text style={styles.modalTextT}>Oferta</Text>
                <Icon
                  style={styles.iconModal}
                  name="close"
                  size={35}
                  onPress={() => this.setModalVisible(!modalVisible)}
                  iconStyle={{ marginRight: "10%" }}
                />
              </View>
              <View>
                <Text>Nombre</Text>
              </View>
              <View style={styles.secondContainer}>
                <Text style={styles.textModalP}>
                  {this.state.modalData == null
                    ? null
                    : this.state.modalData.price_hr}{" "}
                  / hr
                </Text>

                <Text style={styles.textModalP}>Zona de Clase</Text>

                <Text style={styles.textModalZ}>
                  {this.state.modalData == null
                    ? null
                    : this.state.modalData.class_zone}
                </Text>
              </View>

              <View style={styles.thirdContainer}>
                <TouchableOpacity
                  style={styles.firstButton}
                  onPress={() => this.setModalContraVisible(true)}
                >
                  <Text
                    style={{
                      alignSelf: "center",
                      padding: 20,
                      fontWeight: "bold",
                      fontSize: 17,
                    }}
                  >
                    Contraofertar
                  </Text>
                </TouchableOpacity>
                <View style={styles.thContainer}>
                  <TouchableOpacity
                    style={styles.secondButton}
                    onPress={
                      this.state.user == "true"
                        ? () => this.acceptOffer()
                        : () => this.acceptContraOffer()
                    }
                  >
                    <Text
                      style={{
                        color: "#40E29F",
                        alignSelf: "center",
                        fontWeight: "bold",
                        fontSize: 17,
                      }}
                    >
                      Aceptar
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.thirdButton}
                    onPress={() => this.cancelOffer()}
                  >
                    <Text
                      style={{
                        color: "#d1132c",
                        alignSelf: "center",
                        fontWeight: "bold",
                        fontSize: 17,
                      }}
                    >
                      Rechazar
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalContraVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={stylesB.centeredView}>
            <View style={stylesB.modalView}>
              <Text style={stylesB.modalText}>Has una contraoferta!</Text>
              <TextInput
                style={stylesB.modalInput}
                onChangeText={(value) => this.setState({ price: value })}
                placeholder="Cantidad"
              ></TextInput>
              <TextInput
                style={stylesB.modalInput}
                onChangeText={(value) => this.setState({ location: value })}
                placeholder="Ubicacion"
              ></TextInput>
              <View style={stylesB.modalButtons}>
                <TouchableHighlight
                  style={stylesB.openButton}
                  onPress={() => {
                    this.setModalContraVisible(!modalContraVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Cancelar</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={stylesB.openButton}
                  onPress={() => {
                    {
                      this.contraOffer();
                    }
                  }}
                >
                  <Text style={stylesB.textStyle}>Enviar Oferta</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
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
  offer: {
    width: "100%",
    backgroundColor:'white',
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: "2%",
    
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  titleText: {
    alignSelf: "center",
    fontSize: 20,
    marginBottom: "5%",
    backgroundColor: "#40E29F",
    borderRadius: 10,
    padding: 20,
    color: "white",
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  firstText: {
    alignSelf: "center",
    fontSize: 12,
    color: "gray",
  },
  offerContainer: {
    flexDirection: "column-reverse",
    padding: 10,
    width: "35%",
  },
  secondText: {
    fontSize: 15,
    alignSelf: "flex-end",
    fontWeight: "bold",
    color: "gray",
  },
  offerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "gray",
  },
  centeredView: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    position: 'absolute',
    width: '100%',
    height: '100%',
    
    backgroundColor: 'rgba(100,100,100, 0.8)',
    
  },
  modalView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "white",

    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: "85%",

    width: "100%",
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  firstContainer: {
    flexDirection: "row",
    width: "100%",
    alignContent: "space-between",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalTextT: {
    fontSize: 25,
    fontWeight: "bold",
    padding: 30,
  },

  iconModal: {
    padding: 30,
  },
  secondContainer: {
    flexDirection: "column",
    width: "100%",
  },
  textModalP: {
    alignSelf: "flex-end",
    marginRight: "10%",
    fontSize: 16,
    padding: 10,
  },
  textModalZ: {
    alignSelf: "flex-end",
    marginRight: "10%",
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    backgroundColor: "#40E29F",
    color: "white",
    borderRadius: 20,
  },

  thirdContainer: {
    flexDirection: "column",
    height: "30%",
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  thContainer: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
  },
  firstButton: {
    alignSelf: "center",
    borderWidth: 0.3,
    width: "100%",
    height: "40%",
    padding: 5,
    marginTop: "5%",
    borderColor: "gray",
  },
  secondButton: {
    width: "50%",
    alignContent: "center",
    justifyContent: "center",
    borderWidth: 0.3,
    height: "50%",
    borderColor: "gray",
  },
  thirdButton: {
    width: "50%",
    alignContent: "center",
    justifyContent: "center",
    borderWidth: 0.3,
    height: "50%",
    borderColor: "gray",
  },
});
const stylesB = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    backgroundColor: "rgba(100,100,100, 0.8)",
    padding: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    
  },
  openButton: {
    backgroundColor: "#40E29F",
    borderRadius: 20,
    padding: 15,
    elevation: 2,
    margin: "5%",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  modalInput: {
    borderBottomWidth: 0.6,
    marginBottom: "10%",
    padding: 15,
  },
  modalButtons: {
    flexDirection: "row",
    alignContent: "flex-start",

    justifyContent: "space-between",
  },
});
