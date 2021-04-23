import React, { Component, useEffect, use } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import * as Icon from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { Button, Input, Block, Text, Card } from "../components";
import { theme, mocks } from "../constants";
import LottieView from 'lottie-react-native'


class Correct3 extends Component {

  render() {
    
    return (
      <Block>
          <Block style={styles.container}>
          <Image source={require("../assets/images/easel.png")} style={styles.easel}>
          </Image>  
          <Image source={require("../assets/images/dogcolor.png")} style={styles.picture}>
          </Image>  
          </Block>
    </Block>
    )
  }
}

export default Correct3

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base * 2
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  easel: {
    height: 500,
    width: 500,
    position: "absolute",
    bottom: 200,
  },
  picture: {
    width: 200,
    height: 200,
    position: "absolute",
    top: 180
  },
  record: {
    width: 200,
    height: 200,
    position: "absolute",
    bottom: 10,
  },
})