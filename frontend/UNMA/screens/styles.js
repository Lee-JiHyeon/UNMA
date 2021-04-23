import { StyleSheet, Dimensions } from "react-native";

const { width: winWidth, height: winHeight } = Dimensions.get("window");

export default StyleSheet.create({
  alignCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  preview: {
    height: winHeight,
    width: winWidth,
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  bottomToolbar: {
    width: winWidth,
    position: "absolute",
    height: 100,
    bottom: 0,
    marginBottom: 25,
  },
  captureBtn: {
    width: 60,
    height: 60,
    borderWidth: 4,
    borderRadius: 90,
    borderColor: "rgba(249,204,48,0.6)",
  },
  captureBtnActive: {
    width: 70,
    height: 70,
  },
  captureBtnInternal: {
    width: 62,
    height: 62,
    borderWidth: 5,
    borderRadius: 90,
    backgroundColor: "rgba(249,204,48,0.6)",
    borderColor: "transparent",
  },
  //   galleryContainer: {
  //     bottom: 100,
  //   },
  //   galleryImageContainer: {
  //     width: 95,
  //     height: 95,
  //     marginRight: 5,
  //   },
  //   galleryImage: {
  //     width: 95,
  //     height: 95,
  //   },
});
