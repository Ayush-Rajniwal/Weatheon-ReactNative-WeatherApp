import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Vibration, SafeAreaView, Platform, StatusBar } from 'react-native';
import { MaterialCommunityIcons, Fontisto, Entypo, Feather } from '@expo/vector-icons';
import LabelBox from './LabelBox';
import DoubleClick from 'react-native-double-tap';
import Snackbar from 'react-native-snackbar-component';
import Prompt from 'react-native-input-prompt';
import { _storeData, _retrieveData } from '../helper/storage';
const API_KEY = ''; //Insert your openweather API key


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locTemp: "Muradnagar",
      temp: 0,
      loc: 'Muradnagar',
      weatherType: 'Sunny',
      windSpeed: 0,
      humidity: 0,
      snackbar: false,
      promptVisible: false,
    };

    this.openPrompt = this.openPrompt.bind(this);
    this.updateData = this.updateData.bind(this);


  }

  updateData() {
    Vibration.vibrate(50);
    // console.log(this.state.loc);
    this.setState({ snackbar: true })
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${this.state.locTemp}&appid=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((res) => {
        // console.log("Fetching Result");
        if (res.cod === "404") {
          alert(res.message);
          this.setState({ snackbar: false })
          return
        }
        this.setState({
          temp: Math.round(res.main.temp),
          loc: res.name,
          weatherType: res.weather[0].main,
          windSpeed: res.wind.speed,
          humidity: res.main.humidity
        });
        this.setState({ snackbar: false });
        console.log("Saving data " + this.state.loc);

        _storeData('loc', res.name);
      })
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    _retrieveData('loc').then((val) => {
      console.log("Reading loc from storage " + val);
      if (val === null)
        this.setState({ loc: "Muradnagar" }, this.updateData);
      else
        this.setState({ locTemp: val, loc: val }, this.updateData);
    });
  }

  getWeathIcon() {
    let iconType = <Fontisto name="day-sunny" size={40} color="#fff" />;
    switch (this.state.weatherType) {
      case "Thunderstorm": iconType = <Entypo name="thunder-cloud" size={40} color="#fff" />; break;
      case "Drizzle": iconType = <Feather name="cloud-drizzle" size={40} color="#fff" />; break;
      case "Rain": iconType = <Feather name="cloud-rain" size={40} color="#fff" />; break;
      case "Snow": iconType = <Feather name="cloud-snow" size={40} color="#fff" />; break;
      case "Dust": iconType = <MaterialCommunityIcons name="weather-sunset" size={40} color="#fff" />; break;
      case "Fog": iconType = <MaterialCommunityIcons name="weather-fog" size={40} color="#fff" />; break;
      case "Haze": iconType = <Fontisto name="day-haze" size={40} color="#fff" />; break;
      case "Clouds": iconType = <Fontisto name="cloudy" size={40} color="#fff" />; break;
    }
    return (
      <React.Fragment>
        {iconType}
        <Text style={styles.subText}>{this.state.weatherType}</Text>
      </React.Fragment>
    );
  }

  openPrompt() {
    this.setState({ promptVisible: true })
  }

  render() {
    return (

      <DoubleClick
        doubleTap={() => {
          // console.log("Double tap");
          this.updateData()
        }}
        delay={200}
      >

        <ImageBackground
          source={require('../assets/bg.jpg')}
          style={{ width: '100%', height: '100%' }}>
          <StatusBar backgroundColor="black" />
          <Fontisto style={{ top: 30, left: 20 }} name="nav-icon-a" color="white" size={20} onPress={() => this.props.navigation.toggleDrawer()} />
          <View style={styles.weatherTemp}>
            <Text style={styles.weatherText}>
              {this.state.temp}
              <MaterialCommunityIcons
                name="temperature-celsius"
                size={24}
                color="white"
              />
            </Text>
            <Text style={styles.subText}>In{" "}
              <Text onPress={this.openPrompt} style={{ textDecorationLine: "underline" }}>
                {this.state.loc}</Text>
            </Text>
          </View>
          <View style={styles.weartherIconHolder}>{this.getWeathIcon()}</View>
          <View style={styles.bottomContainer}>
            <LabelBox windSpeed={this.state.windSpeed} humidity={this.state.humidity} />
          </View>
          <Snackbar
            backgroundColor={"#24336a"}
            accentColor={"#f7a772"}
            visible={this.state.snackbar}
            actionHandler={() => { this.setState({ snackbar: false }) }}
            actionText="Hide"
            textMessage="Updating Weather"
          />
          <Prompt
            visible={this.state.promptVisible}
            title="Enter Location"
            placeholder="Delhi"
            onCancel={() =>
              this.setState({
                promptVisible: !this.state.promptVisible
              })
            }
            submitText="Search"
            onSubmit={(text) => {
              if (text.length === 0) return; //Empty input
              this.setState({
                locTemp: text,
                promptVisible: !this.state.promptVisible
              }, this.updateData);
            }
            }
          />

        </ImageBackground>
      </DoubleClick >
    );
  }
}

const styles = StyleSheet.create({

  weatherTemp: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherText: {
    color: '#fff',
    fontSize: 100,
    fontFamily: 'monospace',
  },
  subText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'monospace',
  },
  weartherIconHolder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"

  },
  bottomContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignContent: "flex-start",

  },
  AndroidSafeArea: {
    flex: 1,

  }

});

export default Main;
