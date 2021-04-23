import React, { Component } from "react";
import { Image, StyleSheet, ScrollView, TextInput } from "react-native";
import Slider from "react-native-slider";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios"

import { Divider, Button, Block, Text, Switch } from "../components";
import { theme, mocks } from "../constants";
import AsyncStorage from '@react-native-community/async-storage';


const language = [
  {
    label: "영어",
    value: "character_eng_name",
  },
  {
    label: "한국어",
    value: "character_kor_name",
  },
  {
    label: "일본어",
    value: "character_jpn_name",
  },
  {
    label: "중국어",
    value: "character_chn_name",
  },
];

class Settings extends Component {
  state = {
    progress: 85,
    childlanguage: 0,
    selectedLanguage: '',
    collectionRate: 0,
  };

  componentDidMount() {
    const { selectedLanguage } = this.state;
    AsyncStorage.getItem('language', (err, res) => {
      this.setState({selectedLanguage : res})
    })
    // console.log(this.state.selectedLanguage);
    this.onLoad()  
  }

  
  onLoad = () => {
    this.props.navigation.addListener('willFocus', () => {
      AsyncStorage.getItem('language', (err, res) => {
        // console.log(res)
        if (res === 'character_eng_name') {
          this.setState({ childlanguage : 0})
        } else if (res === 'character_kor_name') {
          this.setState({ childlanguage : 1})
        } else if (res === 'character_jpn_name') {
          this.setState({ childlanguage : 2})
        } else if (res === 'character_chn_name') {
          this.setState({ childlanguage : 3})
        }
        // console.log(this.state.childlanguage)
      })
      AsyncStorage.getItem('childPk', (err, res) => {
        const childPk = res
        const collInfo = {
          "kidpk" : childPk
        }
        axios.post('http://j4c105.p.ssafy.io:8000/silhouettes/characterRating/', collInfo)
        .then((res) => {
          console.log('수집율확인')
          // this.setState({ collectionRate: res})
        })
        .catch((err) => {
          // console.error(err)
        })
        const quizlogInfo = {
          "kidpk" : childPk
        }
        axios.post('http://j4c105.p.ssafy.io:8000/quizs/quizResult/', quizlogInfo)
        .then((res) => {
          // console.log(res, '퀴즈로그확인')
        })
        .catch((err) => {
          // console.error(err)
        })
      })  
    });
  };

  getAll() {
    AsyncStorage.getItem('childPk', (err, res) => {
      const childPk = res
      const Info = {
        "kidpk" : childPk
      }
      axios.post('http://j4c105.p.ssafy.io:8000/accounts/allowData/', Info)
      .then((res) => {
        // console.log(res, '데이터해금')
      })
      .catch((err) => {
        console.error(err)
      })
    })
  }

  render() { 
    const { selectedLanguage } = this.state;
    const placeholder = {
      label: "언어 선택",
      value: {selectedLanguage},
      color: "rgba(255,194,255,1)",
    };
    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            아이 관리
          </Text>
        </Block>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Divider margin={[theme.sizes.base * 2]} />

            <Block style={styles.inputs}>
              <Block margin={[10, 0]}>
                  <Text gray2 thin style={{ marginBottom: 10 }}>
                    스티커 수집률
                  </Text>
                  <Slider
                    disabled
                    minimumValue={0}
                    maximumValue={100}
                    style={{ height: 19 }}
                    thumbStyle={styles.thumb}
                    trackStyle={{ height: 6, borderRadius: 6 }}
                    minimumTrackTintColor={theme.colors.tertiary}
                    maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
                    value={this.state.progress}
                    // onValueChange={(value) => this.setState({ progress: value })}
                  />
                  <Text caption gray right>
                    80%
                  </Text>
               </Block>
            </Block>
            <Block style={styles.inputs}>
              <Block margin={[10, 0]}>
                  <Text gray2 style={{ marginBottom: 10 }}>
                    전체 스티커 잠금 해제
                  </Text>
                  <Button
                    // color="rgba(255,25,051,0.30)"
                    color="rgba(255,204,051,0.5)"
                    style={{width:300, height:40,marginBottom:5}}
                    onPress={() => this.getAll()}
                  >
                    <Text dark center>
                      전체 스티커 잠금 해제
                    </Text>
                  </Button>           
               </Block>
            </Block>
          <Divider />
          <Block style={styles.inputs}>
            <RNPickerSelect
                placeholder={placeholder}
                items={language}
                onValueChange={(value) => {

                  AsyncStorage.getItem('childPk', (err, res) => {
                    const childPk = res
                    const langInfo = {
                      "kidpk" : childPk,
                      "language" : value
                    }
                    axios.post('http://j4c105.p.ssafy.io:8000/accounts/changelanguage/', langInfo)
                    .then((res) => {
                      // console.log(language[value].label, 'asdf')
                      console.log('언어변경')
                      this.setState({childlanguage : value })
                      const setlanguage = value
                      if (value === 0) {
                          this.setState({ childlanguage : 'character_eng_name'})
                        } else if (value === 1) {
                          this.setState({ childlanguage : 'character_kor_name'})
                        } else if (value === 2) {
                          this.setState({ childlanguage : 'character_jpn_name'})
                        } else if (value === 3) {
                          this.setState({ childlanguage : 'character_chn_name'})
                        }
                      // console.log(setlanguage)
                      // console.log(AsyncStorage.getAllValues())
                      AsyncStorage.removeItem('language')
                      AsyncStorage.setItem('language', setlanguage)
                    })
                  })
                }}
                style={{
                  ...pickerSelectStyles,
                  iconContainer: {
                    top: 10,
                    right: 12,
                  },
                }}
                value={this.state.childlanguage}
                useNativeAndroidPickerStyle={false}
                textInputProps={{ underlineColor: "yellow" }}
                Icon={() => {
                  return <Ionicons name="md-arrow-down" size={24} color="gray" />;
                }}
              />
          </Block>
          <Divider margin={[theme.sizes.base * 2]} />
            <Block style={styles.sliders}>
              <Button
                // color="rgba(255,204,051,0.5)"
                color="rgba(41,216,143,0.20)"
                style={{width:300, height:40,marginBottom:5}}
              >
                <Text dark center>
                  자녀의 퀴즈 학습 기록
                </Text>
              </Button>           
            </Block>
          <Divider />

          
        </ScrollView>
      </Block>
    );
  }
}

Settings.defaultProps = {
  profile: mocks.profile,
};

export default Settings;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2,
  },
  inputs: {
    marginTop: theme.sizes.base * 0,
    paddingHorizontal: theme.sizes.base * 2,
  },
  inputRow: {
    alignItems: "flex-end",
  },
  sliders: {
    marginTop: -15,
    paddingHorizontal: theme.sizes.base * 2,
  },
  thumb: {
    width: theme.sizes.base,
    height: theme.sizes.base,
    borderRadius: theme.sizes.base,
    borderColor: "rgba(255,204,051,0.5)",
    borderWidth: 3,
    backgroundColor: "rgba(255,204,051,0.8)"
  },
  toggles: {
    paddingHorizontal: theme.sizes.base * 2,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "rgba(255,204,051,0.8)",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.7,
    borderColor: "rgba(255,204,051,0.8)",
    borderRadius: 6,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});