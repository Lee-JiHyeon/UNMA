import React from "react";
import { Camera } from "expo-camera";
import { View, Text } from "react-native";
import * as Permissions from "expo-permissions";
import { Card, Badge, Button, Block } from "../components";
import styles from "./styles";
import Toolbar from "./ToolbarComponent";
import Gallery from "./GalleryComponent";

export default class CameraPage extends React.Component {
  camera = null;

  state = {
    captures: [],
    capturing: null,
    hasCameraPermission: null,
    cameraType: Camera.Constants.Type.back,
    flashMode: Camera.Constants.FlashMode.off,
  };

  setFlashMode = (flashMode) => this.setState({ flashMode });
  setCameraType = (cameraType) => this.setState({ cameraType });
  handleCaptureIn = () => this.setState({ capturing: true });

  handleCaptureOut = () => {
    if (this.state.capturing) this.camera.stopRecording();
  };

  handleShortCapture = async () => {
    const { navigation } = this.props;
    const options = { base64: true };
    const photoData = await this.camera.takePictureAsync(options);

    // console.log("베이스값 : " + photoData.base64);

    this.setState({
      base64: photoData.base64,
      capturing: false,
      captures: [photoData, ...this.state.captures],
    });
    // console.log(photoData.uri)
    navigation.navigate("CameraCaptioning", { uri: photoData });
  };

  async componentDidMount() {
    const camera = await Permissions.askAsync(Permissions.CAMERA);
    const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    const hasCameraPermission =
      camera.status === "granted" && audio.status === "granted";

    this.setState({ hasCameraPermission });
  }

  render() {
    const {
      hasCameraPermission,
      flashMode,
      cameraType,
      capturing,
    } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>카메라 접근이 거부되었습니다.</Text>;
    }

    return (
      <React.Fragment>
        <View>
          <Camera
            type={cameraType}
            flashMode={flashMode}
            style={styles.preview}
            ref={(camera) => (this.camera = camera)}
          ></Camera>
        </View>

        <Toolbar
          capturing={capturing}
          flashMode={flashMode}
          cameraType={cameraType}
          setFlashMode={this.setFlashMode}
          setCameraType={this.setCameraType}
          onCaptureIn={this.handleCaptureIn}
          onCaptureOut={this.handleCaptureOut}
          onShortCapture={this.handleShortCapture}
        />
      </React.Fragment>
    );
  }
}
