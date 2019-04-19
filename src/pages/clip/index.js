import Taro, { Component } from "@tarojs/taro";
import {
  View,
  Button,
  Image,
  Camera,
  CoverView,
  CoverImage,
  Canvas
} from "@tarojs/components";
import "./index.scss";

export default class Clip extends Component {
  config = {
    navigationBarTitleText: "裁切"
  };
  state = {
    src: "",
    width: 0,
    height: 0,
    imgWidth: 0,
    imgHeight: 0
  };
  chooseImage = () => {
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: "album",
      success: res=> {
        wx.getImageInfo({
          src: res.tempFilePaths[0],
          success: res=> {
            const originImg = res.path;
            this.setState({
              imgWidth: res.width,
              imgHeight: res.height,
              src: originImg,
              height: (this.state.width / res.width) * res.height
            });
            this.canvas = wx.createCanvasContext("img-canvas", this);
            this.canvas.drawImage(
              originImg,
              0,
              0,
              this.state.width,
              this.state.height
            );
            this.canvas.draw();
          }
        });
      }
    });
  };
  componentDidMount() {
    wx.getSystemInfo({
      success: res => {
        this.setState({
          width: res.windowWidth
        });
      }
    });
  }
  render() {
    const { src, width, height } = this.state;
    return (
      <View className="cilp">
        <Button onClick={this.chooseImage}>选择</Button>
        <Image src={src} style={`width:${width}px; height:${height}px;`} />
        <Canvas
          canvas-id="img-canvas"
          style={`width:${width}px; height:${height}px;`}
        />
      </View>
    );
  }
}
