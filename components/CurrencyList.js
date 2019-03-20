import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import CurrencyBasicInfo from "./CurrencyBasicInfo";

type Props = {};

export default class CurrencyList extends Component<Props> {
  static navigationOptions = {
    title: 'Kursy walut',
  };

  render() {
    const {navigation} = this.props;

    return (
      <ScrollView style={styles.container}>
        {navigation.state.params.map(currency => {
          return (
            <CurrencyBasicInfo
              key={currency.code}
              name={currency.currency}
              code={currency.code}
              rates={currency.rates}
              navigation={navigation}
            />
          )
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e4e4e4',
    paddingTop: 6
  }
});
