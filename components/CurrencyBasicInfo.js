import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableHighlight} from 'react-native';
import CurrencySymbol from "./CurrencySymbols"

type Props = {
  name: string,
  code: string,
  rates: Array
};

export default class CurrencyBasicInfo extends Component<Props> {
  static navigationOptions = {
    title: 'Kursy walut',
  };


  render() {
    const {name, code, rates, navigation} = this.props;
    const newestValue = rates[rates.length - 1].rate;
    const secondNewestValue = rates[rates.length - 2].rate;
    const percentage = getPercentageChange(secondNewestValue, newestValue);
    let percentageColor = {};

    if (percentage > 0) {
      percentageColor = styles.positivePercentage;
    } else if (percentage < 0) {
      percentageColor = styles.negativePercentage
    }

    return (
      <TouchableHighlight
        onPress={() => navigation.navigate("CurrencyDetailedInfo", {name, code, rates})}
        underlayColor="white"
      >
        <View style={styles.container}>
          <View style={styles.signContainer}>
            <Text style={styles.signText}>{CurrencySymbol[code]}</Text>
          </View>
          <View style={styles.currencyInfoContainer}>
            <Text style={styles.codeText}>{code}</Text>
            <Text>{name}</Text>
          </View>
          <View style={styles.currencyInfoContainer}>
            <Text style={styles.currencyValue}>{rates[rates.length - 1].rate}</Text>
            <Text style={percentageColor}>{`${percentage.toFixed(2)}%`}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

function getPercentageChange(oldNumber, newNumber) {
  const decreaseValue = oldNumber - newNumber;
  return (decreaseValue / oldNumber) * 100;
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    margin: 6,
    padding: 6,
    height: 75
  },
  signContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 6,
  },
  signText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  currencyInfoContainer: {
    flex: 2,
    justifyContent: "center",
  },
  codeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  currencyValue: {
    fontSize: 20
  },
  positivePercentage: {
    color: "#00b02a"
  },
  negativePercentage: {
    color: "#F00"
  }

});
