import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import StationCard from "./StationCard";
import FiltersIcon from "../../assets/png/filters.png";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-ico-flags";
import { Languages } from "./Languages";

export default function AllStations({ route, navigation }) {
  const { dataFromUrl } = route.params;
  const { routeTitle } = route.params;
  const [language, setLanguage] = useState("uz");
  const [title, setTitle] = useState(Languages[language].allstations);

  const changeLanguage = () => {
    if (language === "uz") {
      setLanguage("ru");
    } else if (language === "ru") {
      setLanguage("en");
    } else {
      setLanguage("uz");
    }
  };

  useEffect(() => {
    if (routeTitle) {
      setTitle(routeTitle);
    }

    console.log(dataFromUrl);
  }, [routeTitle]); 

  useEffect(() => {
    setTitle(Languages[language].allstations);
  }, [language]); 

  return (
    <>
      <View style={styles.container}>
        <ScrollView style={styles.containerWrapper}>
          <View style={styles.filters}>
            <Text style={styles.heading}>{title}</Text>
            <View style={styles.filtersBtns}>
              <TouchableOpacity onPress={changeLanguage}>
                {language === "uz" && (
                  <Icon name="uzbekistn" width="60" height="30" />
                )}
                {language === "ru" && (
                  <Icon name="russia" width="60" height="30" />
                )}
                {language === "en" && (
                  <Icon
                    name="united-kingdom"
                    width="60"
                    height="30"
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Filters", {
                    dataFromUrl,
                    language,
                  })
                }
              >
                <Image source={FiltersIcon} style={styles.filterIconStyles} />
              </TouchableOpacity>
            </View>
          </View>
          {dataFromUrl &&
            dataFromUrl.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.navigate("StationDetails", {
                      dataFromUrl,
                      item,
                      language,
                    })
                  }
                >
                  <StationCard item={item} language={language} />
                </TouchableOpacity>
              );
            })}
        </ScrollView>
        <TouchableOpacity
          style={styles.showOnMapButton}
          onPress={() =>
            navigation.navigate("MapRoot", { dataFromUrl, language })
          }
        >
          <Text style={styles.buttonText}>{Languages[language].showOnMap}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#2F2F2F",
    paddingTop: 40,
    flex: 1,
    height: "100%",
  },
  filters: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  filterIconStyles: {
    width: 21,
    height: 21,
    marginLeft: 10,	
    objectFit: "cover",
  },
  heading: {
    fontSize: 22,
    color: "white",
  },
  containerWrapper: {
    paddingHorizontal: 20,
    height: "100%",
  },
  filtersBtns: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  showOnMapButton: {
    backgroundColor: "#0094FF",
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});
