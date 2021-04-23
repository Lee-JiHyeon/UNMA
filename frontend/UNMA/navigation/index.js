import React from "react";
import { Image } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Forgot from "../screens/Forgot";
import Explore from "../screens/Explore";
import Main from "../screens/Main";
import Settings from "../screens/Settings";

import Quizone from "../screens/Quizone";
import Quiztwo from "../screens/Quiztwo";
import Quizthree from "../screens/Quizthree";
import Correct from "../screens/Correct";
import Correct2 from "../screens/Correct2";
import Correct3 from "../screens/Correct3";

import Parents from "../screens/Parents";
import Silhouette from "../screens/Silhouette";

//실루엣 북
import Food from "../screens/Food";
import Road from "../screens/Road";
import Kitchen from "../screens/Kitchen";
// import Playground from "../screens/Playground";
import Detail from "../screens/Detail";
import Room from "../screens/Room";
import Livingroom from "../screens/Livingroom";
import Park from "../screens/Park";
import Bath from "../screens/Bath";
import Zoo from "../screens/Zoo";
import Ski from "../screens/Ski";
import Quiz from "../screens/Quiz";
import CameraPage from "../screens/CameraPage";
import CameraCaptioning from "../screens/CameraCaptioning";
import Transport from "../screens/Transport";
import Golden from "../screens/Golden";
import Addchild from "../screens/Addchild";
import Album from "../screens/Album";

import { theme } from "../constants";

const screens = createStackNavigator(
  {
    Welcome,
    Login,
    SignUp,
    Forgot,
    Explore,
    Main,
    Settings,

    Quizone,
    Quiztwo,
    Quizthree,
    Correct,
    Correct2,
    Correct3,

    Silhouette,
    Parents,
    Food,
    Kitchen,
    Road,
    // Playground,
    Room,
    Zoo,
    Ski,
    Detail,
    Quiz,
    CameraPage,
    CameraCaptioning,
    Transport,
    Bath,
    Livingroom,
    Park,
    Golden,
    Addchild,
    Album,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        height: theme.sizes.base * 4,
        backgroundColor: theme.colors.white, // or 'white
        borderBottomColor: "transparent",
        elevation: 0, // for android
      },
      headerBackImage: <Image source={require("../assets/icons/back.png")} />,
      headerBackTitle: null,
      headerLeftContainerStyle: {
        alignItems: "center",
        marginLeft: theme.sizes.base * 2,
        paddingRight: theme.sizes.base,
      },
      headerRightContainerStyle: {
        alignItems: "center",
        paddingRight: theme.sizes.base,
      },
    },
  }
);

export default createAppContainer(screens);
