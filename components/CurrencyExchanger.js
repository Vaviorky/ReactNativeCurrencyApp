import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, Picker, Keyboard} from 'react-native';

type Props = {};

export default class CurrencyExchanger extends Component<Props> {
  static navigationOptions = {
    title: 'Przelicznik walut',
  };

  constructor(props) {
    super(props);
    const {navigation} = this.props;
    this.state.from = navigation.state.params[0];
    this.state.to = navigation.state.params[1];
  }

  state = {
    isFocused: false,
    value: 100,
    from: null,
    to: null
  };

  onChangeText = (newValue) => {
    const probablyNewValue = parseInt(newValue);

    if (newValue === "") {
      this.setState({value: newValue});
    } else if (!isNaN(probablyNewValue)) {
      this.setState({value: probablyNewValue});
    }
  };

  handleBlur = () => {
    this.setState({isFocused: false});
    Keyboard.dismiss();
    console.log("BLUR")
  };

  render() {
    const {isFocused, value, from, to} = this.state;
    const {navigation} = this.props;

    const R = to.mid / from.mid;

    let calculated;

    if (value === "") {
      calculated = 0;
    } else {
      calculated = value / R
    }

    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.fieldContainer}>
            <Text style={{marginRight: 20}}>Kwota</Text>
            <TextInput
              onBlur={this.handleBlur}
              underlineColorAndroid={isFocused ? "#428af8" : "#d7d7d7"}
              onChangeText={(newValue) => this.onChangeText(newValue)}
              value={value.toString()}
              keyboardType="numeric"
              style={styles.input}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text>Przelicz z: </Text>
            <Picker
              selectedValue={from}
              style={styles.input}
              onValueChange={(itemValue) =>
                this.setState({from: itemValue})
              }
            >
              {navigation.state.params.map(currency => {
                return (
                  <Picker.Item
                    key={currency.code}
                    label={`${currency.code} - ${currency.currency} `}
                    value={currency}
                  />
                )
              })}
            </Picker>
          </View>
          <View style={styles.fieldContainer}>
            <Text>Przelicz na: </Text>
            <Picker
              selectedValue={to}
              style={styles.input}
              onValueChange={(itemValue) =>
                this.setState({to: itemValue})
              }
            >
              {navigation.state.params.map(currency => {
                return (
                  <Picker.Item
                    key={currency.code}
                    label={`${currency.code} - ${currency.currency} `}
                    value={currency}
                  />
                )
              })}
            </Picker>
          </View>
          <Text style={styles.calculatedValue}>
            {`${value} ${from.code} = ${calculated.toFixed(2)} ${to.code}`}
          </Text>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: 'white',
  },
  subContainer: {
    alignItems: "center",
    marginTop: 50
  },
  fieldContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  calculatedValue: {
    fontSize: 24,
    marginTop: 20,
    fontWeight: 'bold'
  },
  inputLabel: {
    fontSize: 23
  },
  input: {
    width: 250,
    height: 60,
    fontSize: 25
  }
});
