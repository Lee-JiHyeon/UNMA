import React, { Component, useEffect, use } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as Icon from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { Button, Input, Block, Text, Card } from "../components";
import { theme, mocks } from "../constants";
import LottieView from "lottie-react-native";

class Correct extends Component {

  componentDidMount() {
    const { navigation } = this.props;

    setTimeout(() => {
      navigation.navigate("Quiz")
    }, 2000)
  }


  render() {
    return (
      <LottieView
        source={require("../animations/5785-checkmark.json")}
        autoPlay
        loop={false}
        speed={0.5}
        resizeMode="cover"
      />
    );
  }
}

export default Correct;

const styles = StyleSheet.create({});
