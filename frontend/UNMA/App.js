import React from "react";
import { StyleSheet } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
// import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import AppLoading from "expo-app-loading";
import Navigation from "./navigation/index";
import { Block } from "./components";

ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

const images = [
  require("./assets/icons/back.png"),
  require("./assets/icons/book.png"),
  require("./assets/icons/camera.png"),
  require("./assets/icons/glasses.png"),
  require("./assets/icons/idea.png"),
  require("./assets/icons/quizquiz.png"),
  require("./assets/icons/quiz.png"),
  require("./assets/icons/silhouette.png"),
  require("./assets/icons/sticker.png"),
  require("./assets/images/settings.png"),
  require("./assets/images/unma_1.png"),
  require("./assets/images/unma_2.png"),
  require("./assets/images/unma_3.png"),
  require("./assets/images/unma_4.png"),
  require("./assets/icons/x.png"),
  require("./assets/images/zoo.png"),
  require("./assets/images/skyscraper.png"),
  require("./assets/images/vehicles.png"),
  require("./assets/images/room.png"),
  require("./assets/images/rice.png"),
  require("./assets/images/kitchen.png"),
  require("./assets/images/couch.png"),
  require("./assets/images/bathtub.png"),
  require("./assets/images/free-icon-park-433102.png"),
  require("./assets/images/skiing.png"),
  require("./assets/images/zoo.png"),

];

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  handleResourcesAsync = async () => {
    // 모든이미지를 캐싱해놓자!! 그래야 앱 퍼퐆먼스 올라간다고함
    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });

    return Promise.all(cacheImages);
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.handleResourcesAsync}
          onError={(error) => console.warn(error)}
          onFinish={() => this.setState({ isLoadingComplete: true })}
        />
      );
    }

    return (
      <Block white>
        <Navigation />
      </Block>
    );
  }
}

const styles = StyleSheet.create({});
