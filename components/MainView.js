import React, {Component} from 'react';
import {Button, StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import axios from "axios";

type Props = {};

let state = {
  currencies: []
};

export default class MainView extends Component<Props> {
  static navigationOptions = {
    title: 'Daniel Wawiórka - Waluty',
  };

  state = state;

  async componentDidMount(): void {
    await this.fetchAPi();
  }

  fetchAPi = async () => {
    const {currencies} = this.state;
    if (currencies.length > 0) return;
    try {
      const date30DaysAgo = this.get30DaysAgoDate();
      const todayDate = this.getTodayDate();
      const url = `http://api.nbp.pl/api/exchangerates/tables/A/${date30DaysAgo}/${todayDate}/?format=json`;
      const data = await axios.get(url);
      this.parseReceivedData(data);
    } catch (e) {
      console.error("Error in fetch data", e)
    }
  };

  getYYYMMDDDate = (dateToEvaluate) => {
    const date = dateToEvaluate == null ? new Date() : dateToEvaluate;
    const mm = date.getMonth() + 1; // getMonth() is zero-based
    const dd = date.getDate();

    return [date.getFullYear(),
      (mm > 9 ? '' : '0') + mm,
      (dd > 9 ? '' : '0') + dd
    ].join('-');
  };

  getTodayDate = () => {
    return this.getYYYMMDDDate(new Date());
  };

  get30DaysAgoDate = () => {
    const today = new Date();
    return this.getYYYMMDDDate(new Date(new Date().setDate(today.getDate() - 30)))
  };

  parseReceivedData = (data) => {
    const days = data.data;
    const currencies = data.data[0].rates;

    for (const day of days) {
      for (const currency of currencies) {
        if (currency.rates == null) {
          currency.rates = [];
        }

        const rate = {
          date: day.effectiveDate,
          rate: day.rates.find(x => x.code === currency.code).mid
        };

        currency.rates.push(rate);
      }
    }

    currencies.sort((a, b) => {
      const nameA = a.code.toLowerCase();
      const nameB = b.code.toLowerCase();
      if (nameA < nameB)
        return -1;
      if (nameA > nameB)
        return 1;
      return 0;
    });

    const codes = [];
    currencies.forEach(x => codes.push(x.code));
    this.setState({currencies});
  };

  setState(prevState, callback) {
    super.setState(prevState, callback);
    state = prevState;
  }

  render() {
    const {currencies} = this.state;
    const {navigation} = this.props;
    const {navigate} = navigation;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigate("CurrencyList", currencies)} style={styles.button}>
          <Text style={styles.textButton}>KURSY WALUT</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate("CurrencyExchanger", currencies)} style={styles.button}>
          <Text style={styles.textButton}>PRZELICZNIK WALUT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e4e4e4',
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2295f2",
    width: 250,
    height: 75,
    marginTop: 10
  },
  textButton: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "white"
  }
});
