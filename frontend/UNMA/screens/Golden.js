import React, { Component, useEffect } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  DeviceEventEmitter,
} from "react-native";

import { Button, Card, Badge, Block, Text } from "../components";
import { theme, mocks } from "../constants";
import { Audio } from 'expo-av'

import axios from "axios"
import AsyncStorage from '@react-native-community/async-storage';

const { width } = Dimensions.get("window");


class Golden extends Component {
  state = {
    children: [],
  };
  
  componentDidMount() {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      shouldDuckAndroid: true,
      staysActiveInBackground: true,
      playThroughEarpieceAndroid: false
    })

    AsyncStorage.getItem('username', (err, res) => {
      const username = res
      axios.post('http://j4c105.p.ssafy.io:8000/accounts/getsettings/', { username })
      .then((res) => {
        if (res.data.effect_music === true) {
          AsyncStorage.setItem('effectsound', 'T')
        }
        if (res.data.background_music === true) {
          // console.log('준비')
          AsyncStorage.setItem('backgroundsound', 'T')
          this.playBGM()
        }
        // const backgroundsound = JSON.stringify(res.data.background_music)
        // console.log(res.data.effect_music)
        // console.log(res.data.background_music)
        // console.log(backgroundsound)
      })
    })
    this.onLoad()  
  }
  
  onLoad = () => {
    this.props.navigation.addListener('willFocus', () => {
      AsyncStorage.getItem('username', (err, res) => {
        const username = res
        axios.post('http://j4c105.p.ssafy.io:8000/accounts/getKid/', { username })
        .then((res) => {
          // console.log(res, '아이정보')
          this.setState({ children: res.data})
        })
      })
    });
  };
  
  async playBGM() {

    const BGM = new Audio.Sound();
    try {
      const status = {
        shouldPlay: false,
        volume : 0.6,
        // volume: 1.0,
      }

      // console.log('발싸')
      await BGM.loadAsync(require('../assets/audio/BGM.mp3'), status, false);
      await BGM.playAsync();
      // console.log("빵")
      
    } catch (error) {
      // An error occurred!
    }
  }
  
  async goMain(childPK) {
    const { navigation } = this.props;
    console.log(childPK, '피케이확인')
    const kidpk = JSON.stringify(childPK)
    console.log(kidpk, '키드')
    await AsyncStorage.setItem('childPk', kidpk)
    await navigation.navigate('Main')  
  }


  render() {
    const { navigation } = this.props;
    const { children } = this.state;
    

    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            아이 선택
          </Text>
        </Block>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: theme.sizes.base * 2 }}
        >
          <Block flex={false} row space="between" style={styles.children}>
            {children.map((child) => (
              <TouchableOpacity
                key={child.name}
                onPress={() => this.goMain(child.pk)}
              >
                <Card center middle shadow style={styles.child}>
                  <Badge
                    margin={[0, 0, 15]}
                    size={60}
                    color="rgba(255,204,051,0.30)"
                  >
                    <Image source={child.gender ? require('../assets/images/boy.png') : require('../assets/images/girl.png')} style={styles.icons} />
                  </Badge>
                  <Text medium height={20}>
                    {child.name}
                  </Text>
                  {/* <Text gray caption>
                    {child.content}
                  </Text> */}
                </Card>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => navigation.navigate("Addchild")}>
              <Card center middle shadow style={styles.child}>
                <Badge
                  margin={[0, 0, 15]}
                  size={60}
                  color="rgba(255,204,051,0.30)"
                >
                  <Image
                    source={require("../assets/icons/addchild.png")}
                    style={styles.icons}
                  />
                </Badge>
                <Text medium height={20}>
                  자녀 등록
                </Text>
                <Text gray caption>
                  개인 맞춤 서비스
                </Text>
              </Card>
            </TouchableOpacity>
          </Block>
        </ScrollView>
      
      </Block>
    );
  }
}

Golden.defaultProps = {
  children: mocks.children,
};

export default Golden;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  children: {
    flexWrap: "wrap",
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5,
  },
  child: {
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