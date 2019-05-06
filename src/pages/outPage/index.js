import Taro, { Component } from "@tarojs/taro";
import { View, WebView } from "@tarojs/components";
export default class OutPage extends Component {
  state = {
    url: ""
  };
  componentDidMount() {
    const url = this.$router.params.url;
    this.setState({ url });
  }
  render() {
    const { url } = this.state;
    return (
      <View>
        <WebView src={url} />
      </View>
    );
  }
}
