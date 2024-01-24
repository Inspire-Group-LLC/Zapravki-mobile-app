import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import HomePage from "./components/HomePage/HomePage";
import AllStations from "./components/AllStations/AllStations";
import MapRoot from "./components/MapRoot/MapRoot";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StationDetails from "./components/StationDetails/StationDetails";

const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
  // const apiUrl = "https://avtoenergy-admin.uz/api/";
  // const [dataFromUrl, setDataFromUrl] = useState("");
  // const [currentStage, setCurrentStage] = useState("HomePage");
  // const [region, setRegion] = useState({
  //   // Default region (for example, center of a city)
  //   latitude: 41.310878,
  //   longitude: 69.279292,
  //   latitudeDelta: 0.0922,
  //   longitudeDelta: 0.0421,
  // });

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const response = await axios.get(apiUrl);
  //       setDataFromUrl(response.data);
  //       // setCurrentStage("AllStations");
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   getData();
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.areaWrapper}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="HomePage"
              component={HomePage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AllStations"
              component={AllStations}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MapRoot"
              component={MapRoot}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="StationDetails"
              component={StationDetails}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  areaWrapper: {
    width: "100%",
    height: "100%",
  },
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
});
