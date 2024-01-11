import React from "react";
import { View, StyleSheet, Image, Text, Pressable } from "react-native";
import FuelStationSvg from "../../assets/png/fuel-station.png";
import Logo from "../../assets/png/logo.png";
import Loader from "../../assets/loader.gif";
  
export default function HomePage(props) {
  return (
    <>
      {props.isOpen && (
        <View style={styles.container}>
          <Image source={FuelStationSvg} style={styles.previewImage} />
          <Text style={styles.heading}>
            Самая большая карта {"\n"}
            заправок в Узбекистане
          </Text>
          {/* <Text style={styles.paragraph}>
            Для начала работы нажмите {"\n"} на кнопку "Найти заправку"
          </Text> */}

          <View style={styles.buttonsWrapper}>
            {/* <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Найти заправку</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={openMap}>
              <Text style={styles.buttonText}>Все Заправки</Text>
            </Pressable> */}
            <Image
              source={Loader}
              style={{ width: 100, height: 100 }}
            />
          </View>
          <Text style={styles.footerText}>avtoenergy.uz</Text>
          <Image source={Logo} style={styles.logo} />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 100,
    backgroundColor: "#2F2F2F",
    position: "relative",
  },
  footerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    position: "absolute",
    bottom: 50,
    left: 43,
  },
  logo: {
    maxWidth: 200,
    height: 40,
    objectFit: "contain",
    position: "absolute",
    bottom: 43,
    right: 0,
  },
  previewImage: {
    width: "100%",
    maxWidth: 300,
    maxHeight: 300,
  },
  heading: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 50,
    textAlign: "center",
  },
  paragraph: {
    color: "#EFEFEF",
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  buttonsWrapper: {
    marginTop: 50,
    flexDirection: "row",
  },
  button: {
    marginTop: 20,
    width: 150,
    height: 50,
    backgroundColor: "#0094FF",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
