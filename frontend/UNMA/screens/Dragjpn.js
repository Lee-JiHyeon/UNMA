import axios from "axios";
import React, { Component } from "react";
import {
  StyleSheet,
  View,
  PanResponder,
  Animated,
  Image,
  Text
} from "react-native";
import { Block } from "../components";

export default class Dragjpn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(),
      showDraggable: true,
      dropAreaValues: null,
      opacity: new Animated.Value(1),
    };
    
    this._val = { x:0, y:0 }
    // this.state.pan.addListener((value) => this._val = value)

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        this.state.pan.setOffset(this.state.pan.__getValue());
        this.state.pan.setValue({x: 0, y: 0});
      },
      onPanResponderMove: Animated.event(
        [null, {dx: this.state.pan.x, dy: this.state.pan.y}],
        {useNativeDriver: false},
      ),
      onPanResponderRelease: (e, gesture) => {
        if (100 < gesture.moveY && gesture.moveY < 400) {
          console.log(gesture.moveY)
          Animated.timing(this.state.opacity, {
            toValue: 0,
            duration: 1000
          }).start(() =>
            this.setState({
              showDarggable: false
            })
          )
          this.check()
        } else {
          Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0},
            friction: 5
          }).start()
        }
      }
    });
  }

  check() {
    this.props.onCheck(1)
  }

  render() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    }
    return (
      <Animated.View
      {...this.panResponder.panHandlers}
      style={[panStyle, {
        opacity: this.state.opacity
      }]}>
        <Text style={styles.word}>{this.props.word}</Text>
      </Animated.View>
    );
  }
}


const styles = StyleSheet.create({
  word: {
      fontSize: 45,
      backgroundColor: "#FAF4AE",
      paddingHorizontal: 10
    }
});