import React, { Component } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { Card, Badge, Button, Block, Text } from "../components";
import { theme } from "../constants";

const { width } = Dimensions.get("window");

class Main extends Component {
  render() {
    const { navigation } = this.props;

    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            실루엣 북
          </Text>
          {/* <Text gray2>6가지 테마</Text> */}
          <Badge margin={[0, 0, 0]} size={30} color="rgba(255,204,051,0.80)">
            <Text center middle>
              10
            </Text>
          </Badge>
        </Block>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: theme.sizes.base * 2 }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Zoo", { Theme_name: "animal"})}>
            <Block space="between" style={styles.cards}>
              <Card center middle shadow>
                <Badge
                  margin={[0, 0, 15]}
                  size={50}
                  color="rgba(255,204,051,0.50)"
                >
                  <Image
                    source={require("../assets/images/zoo.png")}
                    style={styles.icons}
                  ></Image>
                </Badge>
                <Text medium height={20}>
                  동물원
                </Text>
                <Text gray caption>
                  많은 동물들을 구경해보아요
                </Text>
              </Card>
            </Block>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Road", { Theme_name: "road"})}>
            <Block space="between" style={styles.cards}>
              <Card center middle shadow>
                <Badge
                  margin={[0, 0, 15]}
                  size={50}
                  color="rgba(255,204,051,0.50)"
                >
                  <Image
                    source={require("../assets/images/skyscraper.png")}
                    style={styles.icons}
                  ></Image>
                </Badge>
                <Text medium height={20}>
                  교통
                </Text>
                <Text gray caption>
                  도로에서 볼 수 있는
                </Text>
              </Card>
            </Block>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Transport", { Theme_name: "transport"})}>
            <Block space="between" style={styles.cards}>
              <Card center middle shadow>
                <Badge
                  margin={[0, 0, 15]}
                  size={50}
                  color="rgba(255,204,051,0.50)"
                >
                  <Image
                    source={require("../assets/images/vehicles.png")}
                    style={styles.icons}
                  ></Image>
                </Badge>
                <Text medium height={20}>
                  탈것
                </Text>
                <Text gray caption>
                  운송수단
                </Text>
              </Card>
            </Block>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Room", { Theme_name: "myroom"})}>
            <Block space="between" style={styles.cards}>
              <Card center middle shadow>
                <Badge
                  margin={[0, 0, 15]}
                  size={50}
                  color="rgba(255,204,051,0.50)"
                >
                  <Image
                    source={require("../assets/images/room.png")}
                    style={styles.icons}
                  ></Image>
                </Badge>
                <Text medium height={20}>
                  내 방
                </Text>
                <Text gray caption>
                  내 방에는 무엇이 있나요?
                </Text>
              </Card>
            </Block>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Food", { Theme_name: "food"})}>
            <Block space="between" style={styles.cards}>
              <Card center middle shadow>
                <Badge
                  margin={[0, 0, 15]}
                  size={50}
                  color="rgba(255,204,051,0.50)"
                >
                  <Image
                    source={require("../assets/images/rice.png")}
                    style={styles.icons}
                  ></Image>
                </Badge>
                <Text medium height={20}>
                  음식
                </Text>
                <Text gray caption>
                  많은 음식들을 구경해보아요
                </Text>
              </Card>
            </Block>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Kitchen", { Theme_name: "kitchen"})}>
            <Block space="between" style={styles.cards}>
              <Card center middle shadow>
                <Badge
                  margin={[0, 0, 15]}
                  size={50}
                  color="rgba(255,204,051,0.50)"
                >
                  <Image
                    source={require("../assets/images/kitchen.png")}
                    style={styles.icons}
                  ></Image>
                </Badge>
                <Text medium height={20}>
                  부엌
                </Text>
                <Text gray caption>
                  우리집 부엌에는 무엇이 있나요?
                </Text>
              </Card>
            </Block>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Livingroom", { Theme_name: "livingroom"})}>
            <Block space="between" style={styles.cards}>
              <Card center middle shadow>
                <Badge
                  margin={[0, 0, 15]}
                  size={50}
                  color="rgba(255,204,051,0.50)"
                >
                  <Image
                    source={require("../assets/images/couch.png")}
                    style={styles.icons}
                  ></Image>
                </Badge>
                <Text medium height={20}>
                  거실
                </Text>
                <Text gray caption>
                  우리집 거실에는 무엇이 있나요?
                </Text>
              </Card>
            </Block>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Bath", { Theme_name: "bath"})}>
            <Block space="between" style={styles.cards}>
              <Card center middle shadow>
                <Badge
                  margin={[0, 0, 15]}
                  size={50}
                  color="rgba(255,204,051,0.50)"
                >
                  <Image
                    source={require("../assets/images/bathtub.png")}
                    style={styles.icons}
                  ></Image>
                </Badge>
                <Text medium height={20}>
                  욕실
                </Text>
                <Text gray caption>
                  우리집 욕실에는 무엇이 있나요?
                </Text>
              </Card>
            </Block>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Park", { Theme_name: "park"})}>
            <Block space="between" style={styles.cards}>
              <Card center middle shadow>
                <Badge
                  margin={[0, 0, 15]}
                  size={50}
                  color="rgba(255,204,051,0.50)"
                >
                  <Image
                    source={require("../assets/images/free-icon-park-433102.png")}
                    style={styles.icons}
                  ></Image>
                </Badge>
                <Text medium height={20}>
                  공원
                </Text>
                <Text gray caption>
                  공원에서는 무슨일이?
                </Text>
              </Card>
            </Block>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Ski", { Theme_name: "ski"})}>
            <Block space="between" style={styles.cards}>
              <Card center middle shadow>
                <Badge
                  margin={[0, 0, 15]}
                  size={50}
                  color="rgba(255,204,051,0.50)"
                >
                  <Image
                    source={require("../assets/images/skiing.png")}
                    style={styles.icons}
                  ></Image>
                </Badge>
                <Text medium height={20}>
                  스키장
                </Text>
                <Text gray caption>
                  스키장에는 무엇이 있나요?
                </Text>
              </Card>
            </Block>
          </TouchableOpacity>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
        </ScrollView>
      </Block>
    );
  }
}

export default Main;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  settings: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2,
  },
  icons: {
    width: 50,
    height: 50,
    resizeMode: "stretch",
  },
  cards: {
    // flexWrap: "wrap",
    // margin: 0,
    // paddingHorizontal: theme.sizes.base * 2.5,
    // marginBottom: theme.sizes.base * 0.1,
    // width: 415,
    marginLeft: 20,
    marginRight: 20,
  },
});
