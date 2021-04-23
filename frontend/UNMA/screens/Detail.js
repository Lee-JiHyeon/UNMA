import React, { Component } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { Card, Badge, Block, Text } from "../components";
import { theme, mocks } from "../constants";
import Food from "./Food";
// import { Food } from "./screens";
const { width } = Dimensions.get("window");

class Detail extends Component {
  state = {
    yum: [],
  };

  componentDidMount() {
    this.setState({ yum: this.props.yum });
  }

  render() {
    const { navigation } = this.props;
    // const { yum } = this.state;
    const { yum } = this.state;

    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            props
          </Text>
        </Block>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: theme.sizes.base * 2 }}
        ></ScrollView>
      </Block>
    );
  }
}

Detail.defaultProps = {
  //   profile: mocks.profile,
  yum: Food.yum,
};

export default Detail;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  yum: {
    flexWrap: "wrap",
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5,
  },
  zoo: {
    // this should be dynamic based on screen width
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
  },
  icons: {
    width: 50,
    height: 50,
    resizeMode: "stretch",
  },
});
