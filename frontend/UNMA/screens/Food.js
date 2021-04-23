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
import { Audio } from 'expo-av'
import axios from "axios"
import AsyncStorage from '@react-native-community/async-storage';
import LottieView from "lottie-react-native";

const { width } = Dimensions.get("window");

class Food extends Component {
  state = {
    foods: [],
    word: '?',
    language: '',
    open_pic_dir: null,
    close_pic_dir: null,
    checked: false,
  };

  componentDidMount() {
    const { navigation } = this.props;
    const Theme_name = navigation.getParam("Theme_name")
    const Theme_url = Theme_name + "List"

    AsyncStorage.getItem('childPk', (err, res) => {
      const childPk = res
      const ThemeInfo = {
        "kidpk": childPk,
        "bookname": Theme_name
      }
      axios.post(`http://j4c105.p.ssafy.io:8000/silhouettes/${Theme_url}/`, ThemeInfo)
      .then((res) => {
        console.log(res)
        this.setState({ foods: res.data })
      })
      .catch((err) => {
        console.error(err)
      })
    })

    AsyncStorage.getItem('language', (err, res) => {
      this.setState({ language: res })
    })
    Audio.setAudioModeAsync({
			allowsRecordingIOS: false,
			interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
			playsInSilentModeIOS: true,
			interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
			shouldDuckAndroid: true,
			staysActiveInBackground: true,
			playThroughEarpieceAndroid: false
	  })
  }

  getData = (e, ck, o, c) => {
    this.setState({ word: e })
    this.setState({ checked: ck })
    this.setState({ open_pic_dir: o })
    this.setState({ close_pic_dir: c })
  }
  async playSound() {
    const sound = new Audio.Sound();
    const { language } = this.state
    const { word } = this.state
    try {
			const headers = {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json'
			}
			const parameter = {
				language: language,
				word: word,
			}
    	await axios.post('http://j4c105.p.ssafy.io:8000/silhouettes/wordReading/', parameter, headers)
				.then(res => {
					this.audio = res.data.audio
				})
				.catch(err => {
				})
			const status = {
				shouldPlay: false,
				volume: 1.0,
			}
			await sound.loadAsync({ uri : "data:audio/mp3;base64,"+ this.audio}, status, false)
			await sound.playAsync();
    } catch (error) {
      console.log(error)
      // An error occurred!
    }
  }
  render() {
    const { foods } = this.state;
    const { language } = this.state;

    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ paddingVertical: theme.sizes.base * 1 }}
          >
            <Block flex={false} row space="between">
              {foods.map((food) => (
                <TouchableOpacity
                  key={food.character_eng_name}
                  onPress={() => {this.getData(food[language], food.checked, food.open_pic_dir, food.close_pic_dir)}}
                >
                  <Badge
                    center
                    middle
                    margin={[0, 10, 15]}
                    size={60}
                    color="rgba(225,52,12,0.1)"
                  >
                    <Image source={food.checked ? {uri : food.open_pic_dir } : {uri : food.close_pic_dir}} style={styles.stories} />
                  </Badge>
                </TouchableOpacity>
              ))}
            </Block>
          </ScrollView>
        </Block>
        <Block style={styles.container}>
          {/* <LottieView
          source={require("../animations/24003-boiling-pot.json")}
          autoPlay
          style={styles.sun}
        /> */}
          {this.state.checked ? <Image source={{uri: this.state.open_pic_dir}} style={styles.icon}></Image> : <Image source={{uri: this.state.close_pic_dir}} style={styles.icon}></Image>}
          <TouchableOpacity style={styles.eng} onPress={() => {this.playSound()}}>
          <Text style={styles.txt}>{ this.state.word }</Text>
          </TouchableOpacity>
          <Image 
          source={{uri : 'https://image.freepik.com/free-vector/cartoon-illustration-cozy-modern-kitchen-with-dinner-table-household-appliances_1441-1835.jpg'}} style={styles.background}></Image>
        </Block>
      </Block>
    );
  }
}

export default Food;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 0.1,
  },
  stories: {
    width: "60%",
    height: "60%"
  },
  background: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 0
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    resizeMode: "contain",
    width: "60%",
    height: "60%",
    position: "absolute",
    zIndex: 1,
  },
  sun: {
    position: "absolute",
    top: 58,
    left: 15,
    zIndex: 1,
    width: "50%",
    height: "50%"
  },
  eng: {
    fontSize: 60,
    position: "absolute",
    bottom: "10%",
    zIndex: 1,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 3,
    paddingHorizontal: 15,
  },
  txt: {
    fontSize: 30,
  },
});
