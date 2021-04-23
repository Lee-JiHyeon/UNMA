import React, { Component } from "react";
import {
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import RNPickerSelect from "react-native-picker-select";
// import RNPickerSelect, { defaultStyles } from "react-native-picker-select";

import axios from "axios"
import AsyncStorage from '@react-native-community/async-storage';

import { Badge, Button, Block, Input, Text } from "../components";
import { theme } from "../constants";


const { width } = Dimensions.get("window");

const gender = [
  {
    label: "남자",
    value: "1",
  },
  {
    label: "여자",
    value: "0",
  },
];

export default class Addchild extends Component {
  state = {
    username: null,
    childname: null,
    childgender: null,
    errors: [],
    loading: false,
    genderchoice: "선택해주세요",
  };

  componentDidMount() {
    AsyncStorage.getItem('username')
    .then((res) => {
      this.setState({ username: res })
    })
  }


  handleSignUp() {
    const { navigation } = this.props;
    const { username, childname, childgender } = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    console.log(childname, childgender)
    // check with backend API or with some static data
    if (!childname) errors.push("childname");
    // if (!age) errors.push("age");
    // if (!gender) errors.push("gender");

    this.setState({ errors, loading: false });

    if (!errors.length) {
      const childInfo = {
        "username": username,
        "name" : childname,
        "gender" : childgender
      }
      axios.post('http://j4c105.p.ssafy.io:8000/accounts/createKid/', childInfo)
      .then((res) => {
        // console.log(res, '아이생성')
        Alert.alert(
          "등록 성공!",
          "자녀를 선택 후 입장해주세요",
          [
            {
              text: "이동하기",
              onPress: () => {

                navigation.navigate("Golden")
              },
            },
          ],
          { cancelable: false }
        );
      })
      .catch((err) => {
        console.error(err)
      })
    }
  }

  render() {
    const { loading, errors } = this.state;
    const hasErrors = (key) => (errors.includes(key) ? styles.hasErrors : null);
    const placeholder = {
      label: "선택",
      value: null,
      color: "#9EA0A4",
    };


    
    return (
      <KeyboardAvoidingView style={styles.signup} behavior="padding">
        <Block padding={[0, theme.sizes.base * 2]}>
          <Text h1 bold>
            아이 등록
          </Text>
          <Block>
            <Block center middle style={styles.img}>
              <Badge
                margin={[0, 0, 15]}
                size={160}
                color="rgba(255,204,051,0.10)"
              >
                <Image
                  source={require("../assets/icons/addchild.png")}
                  style={styles.icons}
                />
              </Badge>
            </Block>
            <Input
              label="아이 이름"
              error={hasErrors("childname")}
              style={[styles.input, hasErrors("childname")]}
              defaultValue={this.state.childname}
              onChangeText={(text) => this.setState({ childname: text })}
            />
            <Text body gray2>
              성별
            </Text>
            <Text></Text>
            <RNPickerSelect
              placeholder={placeholder}
              items={gender}
              onValueChange={(value) => {
                this.setState({
                  childgender: value,
                });
              }}
              style={{
                ...pickerSelectStyles,
                iconContainer: {
                  top: 10,
                  right: 12,
                },
              }}
              value={this.state.childgender}
              useNativeAndroidPickerStyle={false}
              textInputProps={{ underlineColor: "yellow" }}
              Icon={() => {
                return <Ionicons name="md-arrow-down" size={24} color="gray" />;
              }}
            />
            {/* <Input
              label="자녀 나이"
              error={hasErrors("age")}
              style={[styles.input, hasErrors("age")]}
              defaultValue={this.state.age}
              onChangeText={(text) => this.setState({ age: text })}
            /> */}
            <Text></Text>
            {/* <Text body gray2>
              나이
            </Text> */}
            <Text></Text>

            {/* <RNPickerSelect
              placeholder={placeholder}
              items={age}
              onValueChange={(value) => {
                this.setState({
                  agechoice: value,
                });
              }}
              style={{
                ...pickerSelectStyles,
                iconContainer: {
                  top: 10,
                  right: 12,
                },
              }}
              value={this.state.agechoice}
              useNativeAndroidPickerStyle={false}
              textInputProps={{ underlineColor: "yellow" }}
              Icon={() => {
                return <Ionicons name="md-arrow-down" size={24} color="gray" />;
              }}
            /> */}
            <Text></Text>
            <Text></Text>
            <Button
              onPress={() => this.handleSignUp()}
              color="rgba(255,204,051,0.90)"
            >
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text white center>
                  등록
                </Text>
              )}
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  signup: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  img: {
    margin: 36.3,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 1.4,
    // position: "absolute",

  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  },
  icons: {
    width: 120,
    height: 120,
    resizeMode: "center",
    position: "absolute"
  },
  child: {
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
  },

  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  scrollContentContainer: {
    paddingTop: 40,
    paddingBottom: 10,
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
