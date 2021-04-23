import React, { Component } from "react";
import { StyleSheet, Image, Vibration, View, ScrollView, } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card, Badge, Button, Block, Text } from "../components";
import { theme } from "../constants";
import LottieView from 'lottie-react-native'

import axios from "axios"
import { Audio } from 'expo-av'
import AsyncStorage from '@react-native-community/async-storage';

class Quizthree extends Component {
  state = {
    language: '',
    answer_pic_dir: '',
    answer_word: '',
    select_words: [],
    effectsound: '',
		audio: '',
  };

  componentDidMount() {
    this.onLoad3()
    Audio.setAudioModeAsync({
			allowsRecordingIOS: false,
			interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
			playsInSilentModeIOS: true,
			interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
			shouldDuckAndroid: true,
			staysActiveInBackground: true,
			playThroughEarpieceAndroid: false
		})
		AsyncStorage.getItem('effectsound', (err, res) => {
			this.effectsound = res
		})
  }

  onLoad3 = () => {
    this.props.navigation.addListener('willFocus', () => {
    AsyncStorage.getItem('language', (err, res) => {
        console.log(res, '언어확인입니다. 퀴즈쓰리')
        this.setState({ language: res })
        })
      axios.get('http://j4c105.p.ssafy.io:8000/quizs/showQuiz/')
      .then((res) => {
        // console.log(res.data[3][language])
        const { language } = this.state
        this.setState({ answer_pic_dir: res.data[3].open_pic_dir })
        this.setState({ answer_word: res.data[3][language] })
        const temp_select_word = []
        res.data.forEach(e => temp_select_word.push(e.open_pic_dir))
        this.setState({ select_words: temp_select_word.splice(0, 3)})
        // this.word()
				this.playSound()
      })
      .catch((err) => {
        console.error(err)
      })
    })
  }
  async playSound() {
		console.log('play')
    const sound = new Audio.Sound();
    const { language } = this.state
    const { answer_word } = this.state
    const { audio } = this.state
    try {
			const headers = {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json'
			}
			const parameter = {
				language: language,
				word: answer_word,
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
      // An error occurred!
    }
  }
  async playCorrectSound() {
    const correctsound = new Audio.Sound();
    try {
      const vol = (this.effectsound == 'T') ? 1.0 : 0
      const status = {
        shouldPlay: false,
        volume : vol,
        // volume: 1.0,
      }
      // console.log(type(this.effectsound))
      await correctsound.loadAsync(require('../assets/audio/dididing.mp3'), status, false);
      await correctsound.playAsync();
      
    } catch (error) {
      // An error occurred!
    }
  }

  async sendAnswer() {
    AsyncStorage.getItem('childPk', (err, res) => {
      const kid = res
      console.log(res)
      const ans = {
        "kidpk" : kid,
        "content" : this.state.answer_word,
        "testType" : '듣기퀴즈',
        "testTime" : 1,
        "picDir" : this.state.answer_pic_dir
      }
      axios.post('http://j4c105.p.ssafy.io:8000/quizs/showQuiz/', ans)
      .then((res) => {
        console.log(res)
      })
      
    })
  }

  checkAnswer(word) {
    const { answer_pic_dir } = this.state
    const { navigation } = this.props

    if (answer_pic_dir === word) {
      this.sendAnswer()
      navigation.navigate("Correct2")
    } else {
      Vibration.vibrate()
    }
  }

  render() {
    const { select_words } = this.state;
    const { answer_pic_dir } = this.state
    return (
      <Block>
      
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            듣기 퀴즈
          </Text>
          <Button	onPress={() => {this.playSound()}} >
					  <Image style={{width:50,height:50}} source={require("../assets/icons/sound.png")} ></Image>
				  </Button>
        </Block>
				
        <Block style={styles.container}>
          <LottieView
          source={require("../animations/4975-question-mark.json")}
          autoPlay
          loop={false}
          style={styles.questionmark}
          />
        </Block>
       <Block padding={[0, theme.sizes.base * 0.1]}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{width:360}}>
          {select_words.map((word) => (
            <TouchableOpacity key={word} style={styles.img_contain} onPress={() => {this.checkAnswer(word)}}>
                <Image style={styles.image} source={{ uri : word }}></Image>
              </TouchableOpacity>
          ))}
          </ScrollView>
        </Block> 
      </Block>
    );
  }
}


{/* <Block flex={false} row space="between" style={styles.textDatas}> */}

export default Quizthree;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base * 2,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 30,
    // lineHeight: 24,
    fontWeight: "bold",
  },
  image: {
    resizeMode: "contain",
    height: "100%",
    width: "100%",
    // display: "flex"
  },
  img_contain: {
    width: 105,
    height: 105,
    alignItems: 'center',
    justifyContent: 'center',
    display : "flex",
    marginTop: 100,
    marginLeft: 20
  },  
  sound: {
    width: 70,
    height: 70,
    position: "absolute",
    top: 30,
    left: 18,
  },
  questionmark: {
    width: 350,
    height: 350,
    position: "absolute",
    top: 5,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  test : {
    position: "absolute",
    top: 380,
    left: 140
  }

});
