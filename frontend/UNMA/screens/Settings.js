import React, { Component } from "react";
import { StyleSheet, ScrollView, TextInput } from "react-native";
import axios from "axios"
import { Ionicons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";

import { Divider, Block, Text, Switch } from "../components";
import AsyncStorage from '@react-native-community/async-storage';
import { theme, mocks } from "../constants";


class Settings extends Component {
  state = {
    effectsound: true,
    backgroundsound: true,
  };


  componentDidMount() {
    this.onLoad()  
  
  }

  onLoad = () => {
    this.props.navigation.addListener('willFocus', () => {
      AsyncStorage.getItem('effectsound', (err, res) => {
        // console.log(res)
        if (res === 'T') {
          this.setState({ effectsound : true})
          // this.state.effectsound = true
        } else {
          this.setState({ effectsound : false})
        }
      })
      AsyncStorage.getItem('backgroundsound', (err, res) => {
        // console.log(res)
        if (res === 'T') {
          this.setState({ backgroundsound : true})
        } else {
          this.setState({ backgroundsound : false})
        }
      })
    });
  };

  


  render() {


    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            설정
          </Text>
          <Text gray2>자녀를 위한 선택</Text>
        </Block>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Divider margin={[theme.sizes.base, theme.sizes.base * 2]} />

          <Block style={styles.toggles}>
            <Block
              row
              center
              space="between"
              style={{ marginBottom: theme.sizes.base * 2 }}
            >
              <Text>배경음</Text>
              <Switch
                value={this.state.backgroundsound}
                onValueChange={(value) => {

                  AsyncStorage.getItem('username', (err, res) => {
                    const username = res
                    axios.post('http://j4c105.p.ssafy.io:8000/accounts/backgroundMusic/', { username })
                    .then((res) => {
                      // console.log(res)
                      // console.log(value)
                      console.log('배경음악변경!')
                      this.setState({ backgroundsound: value })
                      if (value === false) {
                        AsyncStorage.removeItem('background')
                        AsyncStorage.setItem('backgroundsound', 'F')
                      } else {
                        AsyncStorage.removeItem('background')
                        AsyncStorage.setItem('backgroundsound', 'T')
                        
                      }
                      
                    })
                  })
                }
                }
              />
            </Block>

            <Block
              row
              center
              space="between"
              style={{ marginBottom: theme.sizes.base * 2 }}
            >
              <Text>효과음</Text>
              <Switch
                value={this.state.effectsound}
                onValueChange={(value) => {

                  AsyncStorage.getItem('username', (err, res) => {
                    const username = res
                    axios.post('http://j4c105.p.ssafy.io:8000/accounts/effectMusic/', { username })
                    .then((res) => {
                      console.log(res.data.효과음 )
                      console.log(value)
                      console.log('효과음악변경!')
                      this.setState({ effectsound: res.data.효과음 })
                      if (res.data.효과음  === false) {
                        AsyncStorage.removeItem('effectsound')
                        AsyncStorage.setItem('effectsound', 'F')
                      } else {
                        AsyncStorage.removeItem('effectsound')
                        AsyncStorage.setItem('effectsound', 'T')
                        
                      }
                    })
                  })
                }
              }
              />
            </Block>
          </Block> 
        </ScrollView>
      </Block>
    );
  }
}

export default Settings;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  toggles: {
    paddingHorizontal: theme.sizes.base * 2,
  },
});
