import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { getCoins, updateCoins } from "../data/CoinStorage";
import { getOwnedBackgrounds, addOwnedBackground, setSelectedBackground, getSelectedBackground } from "../data/BackgroundStorage";

const backgrounds = [
  { id: "bg1", image: require("../assets/bg-purple.jpg"), price: 100},
//   { id: "bg2", image: require("../assets/bg2.jpg"), price: 200 },
//   { id: "bg3", image: require("../assets/bg3.jpg"), price: 350 },
];

const ShopScreen = () => {
  const navigation = useNavigation();
  const [coins, setCoins] = useState(0);
  const [ownedBackgrounds, setOwnedBackgrounds] = useState([]);
  const [selectedBackground, setSelectedBackgroundState] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const userCoins = await getCoins();
    const owned = await getOwnedBackgrounds();
    const currentBg = await getSelectedBackground();

    setCoins(userCoins);
    setOwnedBackgrounds(owned);
    setSelectedBackgroundState(currentBg);
  };

  const purchaseBackground = async (bg) => {
    if (ownedBackgrounds.includes(bg.id)) {
      Alert.alert("already owned", "you already own this background");
      return;
    }
    if (coins >= bg.price) {
      await updateCoins(-bg.price);
      await addOwnedBackground(bg.id);
      setCoins(coins - bg.price);
      setOwnedBackgrounds([...ownedBackgrounds, bg.id]);
      Alert.alert("success", "background purchased!");
    } else {
      Alert.alert("not enough coins", "play more to earn coins");
    }
  };

  const applyBackground = async (bg) => {
    if (ownedBackgrounds.includes(bg.id)) {
      await setSelectedBackground(bg.id);
      setSelectedBackgroundState(bg.id);
      Alert.alert("Background Applied", "Your background has been set!");
    }
  };

  return (
    <View style={styles.container}>

        {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.coinsText}>Coins: {coins}</Text>
      {backgrounds.map((bg) => (
        <View key={bg.id} style={styles.item}>
          <Image source={bg.image} style={styles.image} />
          {ownedBackgrounds.includes(bg.id) ? (
            <TouchableOpacity
              style={[styles.applyButton, selectedBackground === bg.id && styles.applied]}
              onPress={() => applyBackground(bg)}
            >
              <Text style={styles.buttonText}>
                {selectedBackground === bg.id ? "Applied" : "Apply"}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.buyButton}
              onPress={() => purchaseBackground(bg)}
            >
              <Text style={styles.buttonText}>purchase - {bg.price} coins</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    alignItems: "center",
    marginTop: 50 
},
  coinsText: { 
    fontSize: 18, 
    fontWeight: "bold", 
    marginBottom: 20,
    marginTop: 100
},
  item: { 
    alignItems: "center", 
    marginBottom: 20,
    borderRadius: 50
},
  image: { 
    width: 150, 
    height: 100, 
    marginBottom: 10, 
    orderRadius: 10 
},
backButton: {
    position: "absolute",
    top: 70,
    left: 30,
  },
  buyButton: { 
    backgroundColor: "green", 
    padding: 10,
    paddingHorizontal: 12, 
    borderRadius: 20 
},
  applyButton: { 
    backgroundColor: "blue", 
    padding: 10, 
    borderRadius: 5 
},
  applied: { 
    backgroundColor: "gray"
 }, 
  buttonText: { 
    color: "white", 
    fontWeight: "bold" 
},
});

export default ShopScreen;
