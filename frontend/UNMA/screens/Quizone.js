import React, { Component } from "react";
import { StyleSheet, Image, Vibration } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card, Badge, Button, Block, Text } from "../components";
import { theme } from "../constants";
import { Audio } from 'expo-av'
import axios from "axios"
import AsyncStorage from '@react-native-community/async-storage';

class Quizone extends Component {
  state = {
    language: '',
    answer_pic_dir: '',
    answer_word: '',
    select_words: [],
    effectsound: '',
  };

  componentDidMount() {
    this.onLoad()
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
        "testType" : '단어맞추기',
        "testTime" : 1,
        "picDir" : this.state.answer_pic_dir
      }
      axios.post('http://j4c105.p.ssafy.io:8000/quizs/showQuiz/', ans)
      .then((res) => {
        console.log(res)
      })
      
    })
  }
  

  onLoad = () => {
    this.props.navigation.addListener('willFocus', () => {
      AsyncStorage.getItem('language', (err, res) => {
        console.log(res, '언어확인입니다. 퀴즈원')
        this.setState({ language: res })
      })
      axios.get('http://j4c105.p.ssafy.io:8000/quizs/showQuiz/')
      .then((res) => {
        const { language } = this.state
        // console.log(res, '확인퀴즈원')
        // console.log(res.data[3][language])
        this.setState({ answer_pic_dir: res.data[3].open_pic_dir })
        this.setState({ answer_word: res.data[3][language] })
        const temp_select_word = []
        res.data.forEach(e => temp_select_word.push(e[language]))
        this.setState({ select_words: temp_select_word.splice(0, 3)})
        // this.word()
      })
      .catch((err) => {
        console.error(err)
      })
    })
  }

  checkAnswer = (word) => {
    const { answer_word } = this.state
    const { navigation } = this.props;

    console.log(answer_word)
    if (word === answer_word) {
      this.sendAnswer()
      this.playCorrectSound()
      navigation.navigate("Correct")
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
            단어 맞추기 퀴즈
          </Text>
          
        </Block>
        <Block style={styles.container}>
        {this.state.answer_pic_dir ? <Image
            source={{uri : answer_pic_dir }}
            style={styles.image}
          ></Image> : null }
        </Block>
        {select_words.map((word) => (
          <Button onPress={() => {this.checkAnswer(word)}} style={styles.wordCard}>
            <TouchableOpacity key={word}>
              <Text dark style={styles.titleText}>{word}</Text>
            </TouchableOpacity>
          </Button>
        ))}
      </Block>
    );
  }
}

export default Quizone;

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
    // tintColor: "rgba(255,204,051,0.90)"
  },
  image: {
    height: 200,
    width: 200,
    position: "absolute",
    top: 50,
  },
  wordCard: {
    backgroundColor: "rgba(255,204,051,0.10)", 
    height: "10%",
    top: 10,
    bottom: 50,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
    marginRight:20,
    marginBottom:15
  },
});
