import React, { Component } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-simple-modal";

import { Card, Badge, Button, Block, Text } from "../components";
import { theme } from "../constants";
import AsyncStorage from "@react-native-community/async-storage";
const { width } = Dimensions.get("window");
import axios from "axios"


class Main extends Component {
  state = {
    open: false,
    openquiz: false,
    number1: null,
    number2: null,
    quizanswer: null,
    input: ''
  };
  componentDidMount() {
    AsyncStorage.getItem("childPk").then((res) => {
      const kidpk = {
        "kidpk" : res
      }
      // console.log(kidpk)
      axios.post('http://j4c105.p.ssafy.io:8000/accounts/getlanguage/', kidpk )
      .then((res) => {
        const language = res.data.language
        console.log(res.data)
      
        AsyncStorage.removeItem('language')
        AsyncStorage.setItem('language', language)
        console.log(language, "언어?")
      })
      // console.log(res, "메인페이지");

    });
    const number1 = Math.floor(Math.random() * 10)
    const number2 = Math.floor(Math.random() * 10)
    const answer = number1 * number2
    this.setState({ quizanswer: String(answer) })
    this.setState({ number1: number1 })
    this.setState({ number2: number2 })
  }

  getAnswer = (e) => {
    console.log(e)
    const { input } = this.state
    const { quizanswer } = this.state
    const { navigation } = this.props
    if (quizanswer === input + e) {
      this.setState({ input: '' })
      this.setState({ openquiz: false })
      navigation.navigate("Parents")
    } else {
      this.setState({ input: input + e})
    }

  }
  


  


  render() {
    const { navigation } = this.props;
    const { input, number1, number2 } = this.state

    return (
      <Block middle>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            UNMA
          </Text>
          <Button onPress={() => navigation.navigate("Settings")}>
            <Image
              source={require("../assets/images/settings.png")}
              style={styles.settings}
            ></Image>
          </Button>
        </Block>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: theme.sizes.base * 2 }}
        >
          <TouchableOpacity onPress={() => this.setState({ open: true })}>
            <Block style={styles.cards}>
              <Card center middle shadow>
                <Badge
                  margin={[0, 0, 15]}
                  size={50}
                  color="rgba(11,40,180,0.30)"
                >
                  <Image
                    source={require("../assets/icons/camera.png")}
                    style={styles.icons}
                  ></Image>
                </Badge>
                <Text medium height={20}>
                  사진찍기
                </Text>
                <Text gray caption>
                  궁금한 것을 알려드려요
                </Text>
              </Card>
            </Block>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Quiz")}>
            <Block style={styles.cards}>
              <Card center middle shadow>
                <Badge
                  margin={[0, 0, 15]}
                  size={50}
                  color="rgba(255,204,051,0.50)"
                >
                  <Image
                    source={require("../assets/icons/quizquiz.png")}
                    style={styles.icons}
                  ></Image>
                </Badge>
                <Text medium height={20}>
                  퀴즈퀴즈
                </Text>
                <Text gray caption>
                  다양한 퀴즈 풀이
                </Text>
              </Card>
            </Block>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Silhouette")}>
            <Block style={styles.cards}>
              <Card center middle shadow>
                <Badge
                  margin={[0, 0, 15]}
                  size={50}
                  color="rgba(255,25,051,0.30)"
                >
                  <Image
                    source={require("../assets/icons/silhouette.png")}
                    style={styles.icons}
                  ></Image>
                </Badge>
                <Text medium height={20}>
                  실루엣북
                </Text>
                <Text gray caption>
                  여러가지 테마들이 있어요
                </Text>
              </Card>
            </Block>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.setState({ openquiz: true })}>
            <Block style={styles.cards}>
              <Card center middle shadow>
                <Badge
                  margin={[0, 0, 15]}
                  size={50}
                  color="rgba(41,216,143,0.20)"
                >
                  <Image
                    source={require("../assets/icons/crown.png")}
                    style={styles.icons}
                  ></Image>
                </Badge>
                <Text medium height={20}>
                  부모님
                </Text>
                <Text gray caption>
                  아이 관리 공간
                </Text>
              </Card>
            </Block>
          </TouchableOpacity>
          <Text></Text>
          <Text></Text>
        </ScrollView>

        <Modal
          open={this.state.open}
          modalDidOpen={() => console.log("카메라,앨범 선택")}
          modalDidClose={() => this.setState({ open: false })}
          closeOnTouchOutside={true}
          containerStyle={{
            justifyContent: "center",
          }}
          modalStyle={{
            alignItems: "center",
            width: 320,
            borderRadius: 10,
            // marginLeft: 0,
            // marginRigth:5,
            // padding: 5,
            height: 220,
            backgroundColor: "#FFFFFF",
          }}
          animationDuration={300}
          animationTension={100}
        >
          <Button
            shadow
            onPress={() => navigation.navigate("CameraPage")}
            color="rgba(255,204,222,0.90)"
            style={styles.btn}
          >
            <Text center semibold black>
              카메라
            </Text>
          </Button>

          <Button
            onPress={() => navigation.navigate("Album")}
            color="rgba(255,222,222,0.90)"
            style={styles.btn}
          >
            <Text center semibold black>
              갤러리
            </Text>
          </Button>
          <TouchableOpacity
            style={{ marginTop: 20, marginLeft:21 }}

            onPress={() => this.setState({ open: false })}
          >
            <Image
              source={require("../assets/icons/x.png")}
              style={styles.modalclose}
            ></Image>
          </TouchableOpacity>
        </Modal>
        
        <Modal
          open={this.state.openquiz}
          modalDidOpen={() => console.log("자라나라 모달모발")}
          modalDidClose={() => this.setState({ openquiz: false })}
          closeOnTouchOutside={true}
          containerStyle={{
            justifyContent: "center",
          }}
          modalStyle={{
            alignItems: "center",
            width: 320,
            borderRadius: 10,
            // marginLeft: 50,
            padding: 5,
            height: 400,
            backgroundColor: "#FFFFFF",
          }}
          animationDuration={300}
          animationTension={100}
        >

            <Button
              color="rgba(255,204,051,0.90)"
              style={{width:100, height:40,marginBottom:5}}
            >
              <Text dark center>
              보호자 인증
              </Text>
            </Button>
            <Text caption gray2 >
              정답을 입력하세요.
            </Text>
            <Text h1 bold style={{marginBottom:10}}>
              {number1} X {number2} = {input === '' ? "?" : input}
            </Text>
            <TouchableOpacity onPress={this.answerDelete}>
              <Image
                source={require(`../assets/icons/delete.png`)}
                style={styles.delete}>
              </Image>
            </TouchableOpacity>
          <Block style={styles.num1}>
            <TouchableOpacity onPress={() => this.getAnswer(1)}>
              <Image
                source={require(`../assets/icons/1.png`)}
                style={styles.xx}
              ></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.getAnswer(2)}>
              <Image
                source={require(`../assets/icons/2.png`)}
                style={styles.xx}
              ></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.getAnswer(3)}>
              <Image
                source={require(`../assets/icons/3.png`)}
                style={styles.xx}
              ></Image>
            </TouchableOpacity>
          </Block>
          <Block style={styles.num2}>
            <TouchableOpacity onPress={() => this.getAnswer(4)}>
              <Image
                source={require(`../assets/icons/4.png`)}
                style={styles.xx}
              ></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.getAnswer(5)}>
              <Image
                source={require(`../assets/icons/5.png`)}
                style={styles.xx}
              ></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.getAnswer(6)}>
              <Image
                source={require(`../assets/icons/6.png`)}
                style={styles.xx}
              ></Image>
            </TouchableOpacity>
          </Block>
          <Block style={styles.num3}>
            <TouchableOpacity onPress={() => this.getAnswer(7)}>
              <Image
                source={require(`../assets/icons/7.png`)}
                style={styles.xx}
              ></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.getAnswer(8)}>
              <Image
                source={require(`../assets/icons/8.png`)}
                style={styles.xx}
              ></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.getAnswer(9)}>
              <Image
                source={require(`../assets/icons/9.png`)}
                style={styles.xx}
              ></Image>
            </TouchableOpacity>
          </Block>
          <Block style={styles.num3}>
            <TouchableOpacity onPress={() => this.getAnswer(0)}>
              <Image
                source={require(`../assets/icons/0.png`)}
                style={styles.xx}
              ></Image>
            </TouchableOpacity>

          </Block>
{/* 

          <Block style={styles.closebtn}>
            <TouchableOpacity
              style={{ marginTop: 20 }}
              onPress={() => this.setState({ openquiz: false }) }
            >
              <Image
                source={require("../assets/icons/x.png")}
                style={styles.xx}
              ></Image>
            </TouchableOpacity>
          </Block> */}

        </Modal>
      </Block>
    );
  }
}
export default Main;
// onPress={() => this.setState({ open: false })}
// source={require("../assets/icons/x.png")}

// onPress={() => navigation.navigate("Album")}
// source={require("../assets/icons/book.png")}

// onPress={() => navigation.navigate("Camera")}
// source={require("../assets/icons/camera.png")}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  settings: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2,
  },
  icons: {
    width: 50,
    height: 50,
    resizeMode: "stretch",
  },
  cards: {
    // flexWrap: "wrap",
    // margin: 0,
    // paddingHorizontal: theme.sizes.base * 2.5,
    // marginBottom: theme.sizes.base * 0.1,
    // width: 415,
    marginLeft: 20,
    marginRight: 20,
  },
  xx: {
    width: 55,
    height: 50,
    resizeMode: "stretch",
    marginRight: 20
  },
  btn: {
    // alignItems: "center",
    width: 250,
    margin: 20,
  },
  modal: {
    // width: 375,
    borderRadius: 200,
    margin: 20,
    // padding: 5,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 30,
    marginTop: 10
  },
  subtitle: {
    fontSize: 20
  },
  quiz: {
    fontSize: 30,
    marginTop: 10
  },
  num1: {
    flexDirection: "row",
    marginLeft: 20
  },
  num2: {
    flexDirection: "row",
    marginLeft: 20
  },
  num3: {
    flexDirection: "row",
    marginLeft: 20
  },
  closebtn: {
    // flexDirection: "row",
    marginLeft: 20,
    // marginTop:30
  },
  modalclose:{
    width: 40,
    height: 40,
    resizeMode: "stretch",
    marginRight: 20
  },
  delete: {
    width: 55,
    height: 50,
    resizeMode: "stretch",
    marginRight: 20
  }
});
