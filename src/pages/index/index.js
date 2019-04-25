import Taro, { Component } from "@tarojs/taro";
import { View, Button, Image } from "@tarojs/components";
export default class Index extends Component {
  config = {
    navigationBarTitleText: "主页"
  };
  state = {
    isHidden: false,
    cameraBtn: require("../../assets/camera.png"),
    albumBtn: require("../../assets/album.png")
  };
  takePhoto = () => {
    Taro.navigateTo({
      url: "../takePhoto/index"
    });
  };
  clipPhoto = () => {
    wx.chooseImage({
      count: 1,
      sizeType: ["original"],
      sourceType: ["album"],
      success: res => {
        wx.setStorageSync("tempPath", res.tempFilePaths[0]);
        Taro.navigateTo({
          url: "../clipPhoto/index"
        });
      }
    });
  };

  componentDidMount() {}
  render() {
    return (
      <View>
        <Image
          src={cameraBtn}
          style="width: 200px; height: 200px;"
          onClick={this.takePhoto}
        />
        <Image
          src={albumBtn}
          style="width: 200px; height: 200px;"
          onClick={this.clipPhoto}
        />
      </View>
    );
  }
}
