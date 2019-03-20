import React, {Component} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import CurrencySymbol from "./CurrencySymbols"

type Props = {};

export default class CurrencyDetailedInfo extends Component<Props> {
  static navigationOptions = {
    title: 'Szczegóły waluty',
  };

  render() {
    const {navigation} = this.props;
    const {name, code, rates} = navigation.state.params;
    const newestValue = rates[rates.length - 1].rate;
    const secondNewestValue = rates[rates.length - 2].rate;
    const percentage = getPercentageChange(secondNewestValue, newestValue);
    let percentageColor = {};

    if (percentage > 0) {
      percentageColor = styles.positivePercentage;
    } else if (percentage < 0) {
      percentageColor = styles.negativePercentage
    }

    const reversedRatesArray = reverseArr(rates);

    return (
      <ScrollView>
        <View style={styles.currencyInfoContainer}>
          <Text style={styles.currencySymbol}>
            {CurrencySymbol[code]}
          </Text>
          <View style={styles.currencyNames}>
            <Text style={styles.currencyCode}>{code}</Text>
            <Text>{name}</Text>
          </View>
        </View>
        <View style={styles.currencyValueContainer}>
          <Text style={styles.value}>{newestValue}</Text>
          <View style={{marginLeft: 20}}>
            <Text style={percentageColor}>{`${percentage.toFixed(2)}%`}</Text>
          </View>
        </View>
        <View style={{marginLeft: 50}}>
          {reversedRatesArray.map((rate, index) => {
            const newestRateValue = rate.rate;
            const secondNewestRate = reversedRatesArray[index + 1];
            const secondNewestRateValue = secondNewestRate === undefined ? 0 : secondNewestRate.rate;
            let percentageForRate = getPercentageChange(secondNewestRateValue, newestRateValue);

            if (!isFinite(percentageForRate)) {
              percentageForRate = 0;
            }

            let ratePercentageColor = {
              flex: 2
            };

            if (percentageForRate > 0) {
              ratePercentageColor = styles.ratePositivePercentage;
            } else if (percentageForRate < 0) {
              ratePercentageColor = styles.rateNegativePercentage
            }

            return (
              <View style={styles.currencyDateContainer} key={rate.date}>
                <Text style={{flex: 2}}>{rate.date}</Text>
                <Text style={{flex: 2}}>{rate.rate}</Text>
                <Text style={ratePercentageColor}>{`${percentageForRate.toFixed(2)}%`}</Text>
              </View>
            )
          })}
        </View>
      </ScrollView>
    );
  }
}

function getPercentageChange(oldNumber, newNumber) {
  const decreaseValue = oldNumber - newNumber;
  return (decreaseValue / oldNumber) * 100;
}

function reverseArr(input) {
  const ret = [];
  for (let i = input.length - 1; i >= 0; i -= 1) {
    ret.push(input[i]);
  }
  return ret;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    margin: 6,
    padding: 6,
    height: 75
  },
  currencyInfoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  currencySymbol: {
    fontSize: 36,
    marginRight: 30
  },
  currencyNames: {},
  currencyCode: {
    fontSize: 30,
  },
  currencyValueContainer: {
    flex: 1,
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  value: {
    fontSize: 30
  },
  percentageValue: {
    fontSize: 25
  },
  currencyDateContainer: {
    flexDirection: "row",
    marginTop: 5
  },
  positivePercentage: {
    fontSize: 25,
    color: "#00b02a"
  },
  negativePercentage: {
    fontSize: 25,
    color: "#F00"
  },
  ratePositivePercentage: {
    color: "#00b02a",
    flex: 2
  },
  rateNegativePercentage: {
    color: "#F00",
    flex: 2
  }
});
