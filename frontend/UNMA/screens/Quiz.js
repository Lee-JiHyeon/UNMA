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

class Quiz extends Component {
  render() {
    const { navigation } = this.props;

    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            퀴즈퀴즈
          </Text>
          <Badge margin={[0, 0, 0]} size={30} color="rgba(255,204,051,0.80)">
            <Text center middle>
              3
            </Text>
          </Badge>
        </Block>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: theme.sizes.base * 2 }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Quizone")}>
            <Block space="between" style={styles.cards}>
              <Card center middle shadow>
                <Badge
                  margin={[0, 0, 15]}
                  size={50}
                  color="rgba(255,204,051,0.50)"
                >
                  <Image
                    source={require("../assets/images/words.png")}
                    style={styles.icons}
                  ></Image>
                </Badge>
                <Text medium height={20}>
                  단어 맞추기 퀴즈
                </Text>
                <Text gray caption>
                  알맞은 단어를 골라보아요.
                </Text>
              </Card>
            </Block>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Quiztwo")}>
            <Block space="between" style={styles.cards}>
              <Card center middle shadow>
                <Badge
                  margin={[0, 0, 15]}
                  size={50}
                  color="rgba(255,25,051,0.30)"
                >
                  <Image
                    source={require("../assets/images/cards.png")}
                    style={styles.icons}
                  ></Image>
                </Badge>
                <Text medium height={20}>
                  너의 이름은
                </Text>
                <Text gray caption>
                  다양한 외국어를 알아보아요.
                </Text>
              </Card>
            </Block>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Quizthree")}>
            <Block space="between" style={styles.cards}>
              <Card center middle shadow>
                <Badge
                  margin={[0, 0, 15]}
                  size={50}
                  color="rgba(41,216,143,0.20)"
                >
                  <Image
                    source={require("../assets/icons/listening.png")}
                    style={styles.icons}
                  ></Image>
                </Badge>
                <Text medium height={20}>
                  듣기 퀴즈
                </Text>
                <Text gray caption>
                  단어를 듣고 그림을 골라보아요.
                </Text>
              </Card>
            </Block>
          </TouchableOpacity>
        </ScrollView>
      </Block>
    );
  }
}

export default Quiz;

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
