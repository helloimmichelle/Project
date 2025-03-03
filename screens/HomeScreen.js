import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image} from "react-native";

//Add custom background image
const backgroundImage = require("../assets/title-screen-bg.jpg"); 
const logoImage = require("../assets/logo.jpg");

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground source={backgroundImage} style={styles.background}>

    <Image source={logoImage} style={styles.logo}></Image>

      <View style={styles.container}>
        
        <TouchableOpacity 
          style={styles.playButton} 
          onPress={() => navigation.navigate("Mode")}
        >
          <Text style={styles.buttonText}>play</Text>
        </TouchableOpacity>

        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.smallButton}>
            <Text style={styles.buttonText}>sound</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallButton}>
            <Text style={styles.buttonText}>shop</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // ensures image covers the entire screen
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    flex: 1,
    width: null,
    height: 200,
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
    paddingTop: 160,
  },
  playButton: {
    backgroundColor: "#6a79c4",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  bottomButtons: {
    flexDirection: "row",
    gap: 20,
  },
  smallButton: {
    backgroundColor: "#6a79c4",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
