import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';

import {WebView} from 'react-native-webview';

import {Colors} from 'react-native/Libraries/NewAppScreen';
const WEBVIEW_REF = 'WEBVIEW_REF';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canGoBack: false,
      loading: false,
    };
  }
  async componentDidMount() {
    this.setState({loading: true});
    setTimeout(() => {
      this.setState({loading: false});
    }, 3000);
  }

  onBack = () => {
    this.refs[WEBVIEW_REF].goBack();
  };

  onNavigationStateChange = navStat => {
    this.setState({canGoBack: navStat.canGoBack});
  };
  render() {
    if (this.state.loading) {
      return (
        <View>
          <ActivityIndicator
            style={styles.activity}
            color="#f0f"
            size="large"
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.topbar}>
            <TouchableOpacity
              disabled={!this.state.canGoBack}
              onPress={this.onBack.bind(this)}>
              <Text
                style={
                  this.state.canGoBack
                    ? styles.topbarText
                    : styles.topbarTextDisabled
                }>
                Retour
              </Text>
            </TouchableOpacity>
          </View>
          <WebView
            ref={WEBVIEW_REF}
            onNavigationStateChange={this.onNavigationStateChange}
            style={styles.webViewBlock}
            source={{uri: 'http://campus.uvci.edu.ci/'}}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  webViewBlock: {
    backgroundColor: Colors.red,
  },
  container: {
    flex: 1,
    margin: 5,
    padding: 10,
    borderRadius: 5,
    borderColor: 'gray',
    shadowColor: '#323232',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  topbar: {
    backgroundColor: '#8800c9',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topbarText: {
    color: 'white',
  },
  topbarTextDisabled: {
    color: 'gray',
  },
  activity: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});

export default App;
