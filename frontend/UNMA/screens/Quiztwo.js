import React, { Component } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import Dragkor from "./Dragkor";
import Dragjpn from "./Dragjpn";
import Drageng from "./Drageng";
import Dragchn from "./Dragchn";

import axios from "axios"
import { Block, Text } from "../components";
import { Audio } from 'expo-av'
import AsyncStorage from '@react-native-community/async-storage';

export default class Quiztwo extends Component {
  state = {
    answer_pic_dir: '',
    answer_kor_name: '',
    answer_eng_name: '',
    answer_jpn_name: '',
    answer_chn_name: '',
    check: 0,
    effectsound: '',
  }

  componentDidMount() {
    this.onLoad2()
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

  onLoad2() {
    this.props.navigation.addListener('willFocus', () => {
      axios.get('http://j4c105.p.ssafy.io:8000/quizs/showQuiz/')
      .then((res) => {
        console.log(res.data[0].character_eng_name)
        this.setState({ answer_pic_dir: res.data[0].open_pic_dir })
        this.setState({ answer_kor_name: res.data[0].character_kor_name })
        this.setState({ answer_eng_name: res.data[0].character_eng_name })
        this.setState({ answer_jpn_name: res.data[0].character_jpn_name })
        this.setState({ answer_chn_name: res.data[0].character_chn_name })
      })
      .catch((err) => {
        console.error(err)
      })
    })
  }

  checkpoint=(data)=> {
    const { navigation } = this.props
    const { check } = this.state
    const nowCheck = check + data
    if (nowCheck === 4) {
      this.sendAnswer()
      this.playCorrectSound()
      navigation.navigate("Correct2")
      this.setState({ check: 0 })
    } else {
      this.setState({ check: nowCheck})
    }
  }

  async sendAnswer() {
    AsyncStorage.getItem('childPk', (err, res) => {
      const kid = res
      console.log(res)
      const ans = {
        "kidpk" : kid,
        "content" : this.state.answer_kor_name,
        "testType" : '너의 이름은',
        "testTime" : 1,
        "picDir" : this.state.answer_pic_dir
      }
      axios.post('http://j4c105.p.ssafy.io:8000/quizs/showQuiz/', ans)
      .then((res) => {
        console.log(res)
      })
      
    })
  }

  async playCorrectSound() {
    const correctsound = new Audio.Sound();
    try {
      const vol = (this.effectsound == 'T') ? 1.0 : 0
			console.log(vol)
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
  render() {
    const { answer_pic_dir } = this.state
    const { answer_kor_name, answer_eng_name, answer_jpn_name, answer_chn_name } = this.state

    return (
      <Block style={styles.mainContainer}>
        <Block style={styles.mainContainer}>
          {this.state.answer_pic_dir ? <Image
              source={{uri : answer_pic_dir }}
              style={styles.dropZone}
            ></Image> : null }
        </Block>
        <Block style={styles.ballContainer} />
        <Block style={styles.row}>
          	<Dragkor word={answer_kor_name} onPress={() => {this.playCorrectSound()}} onCheck={this.checkpoint}/>
					{/* <TouchableOpacity onPress={() => {this.playCorrectSound()}} >
						<Text>{answer_kor_name}</Text>
					</TouchableOpacity> */}
          <Dragjpn word={answer_jpn_name} onCheck={this.checkpoint}/>
        </Block>
        <Block style={styles.row}>
          <Drageng word={answer_eng_name} onCheck={this.checkpoint}/>
          <Dragchn word={answer_chn_name} onCheck={this.checkpoint}/>
        </Block>

      </Block>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  ballContainer: {
    height:200
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
  },  
  dropZone: {
    resizeMode: "contain",
    position: "absolute",
    top: 50,
    left: 30,
    height: "80%",
    width: "80%",
  },
  text: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold"
  }
});