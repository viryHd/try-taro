import Taro, { Component } from "@tarojs/taro";
import { View, Button, Image, Camera, Canvas } from "@tarojs/components";
import "./index.scss";

export default class Index extends Component {
  state = {
    btnSrc: require("../../assets/icon.jpg"),
    baseSrc: "",
    width: 0,
    height: 0,
    imgWidth: 0,
    imgHeight: 0,
    i: 0
  };
  takePhoto = () => {
    this.ctx.takePhoto({
      success: res => {
        const originImg = res.tempImagePath;
        Taro.getImageInfo({
          src: originImg,
          success: res => {
            this.setState({
              imgWidth: res.width,
              imgHeight: res.height
            });
          }
        }).then(res => {
          this.canvas = wx.createCanvasContext("icanvas", this);
          this.canvas.drawImage(originImg, 0, 0, this.imgWidth, this.imgHeight,0,0,this.width,this.height);
          this.canvas.draw();
          setTimeout(() => {
            wx.canvasToTempFilePath({
              canvasId: "icanvas",
              x: this.imgWidth * 0.4,
              y: this.imgHeight * 0.15,
              width: this.imgWidth * 0.2,
              height: this.imgHeight * 0.7,
              destWidth: this.width * 0.2,
              destHeight: this.height * 0.7,
              success: res => {
                this.filePath = res.tempFilePath;
                // this.canvas.clearRect(0, 0, this.imgWidth, this.imgHeight);
                // this.canvas.drawImage(
                //   this.filePath,
                //   this.imgWidth * 0.4,
                //   this.imgHeight * 0.15,
                //   this.width * 0.2,
                //   this.height * 0.7
                // );
                // this.canvas.draw();
              }
            });
          }, 1000);
        });
      }
    });
  };
  error = e => {
    console.log(e.detail);
  };
  componentWillMount() {}

  componentDidMount() {
    this.ctx = wx.createCameraContext();
    wx.getSystemInfo({
      success: res => {
        this.setState({
          width: res.windowWidth,
          height: res.windowHeight * 0.5
        });
      }
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
  config = {
    navigationBarTitleText: "首页"
  };

  render() {
    return (
      <View className="canvas">
        <Camera
          device-position="back"
          flash="off"
          onError={this.error}
          style="width: 100%; height: 50%;"
        />

        <Button onClick={this.takePhoto}>拍照{i}</Button>
        <Image src={baseSrc} />
        <Canvas
          canvas-id="icanvas"
          style={`width:${width}px; height:${height}px;`}
        />
      </View>
    );
  }
}
