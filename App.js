import {createStackNavigator, createAppContainer} from 'react-navigation';
import MainView from "./components/MainView";
import CurrencyExchanger from "./components/CurrencyExchanger";
import CurrencyList from "./components/CurrencyList";
import CurrencyDetailedInfo from "./components/CurrencyDetailedInfo";

const MainNavigator = createStackNavigator({
  MainView: {screen: MainView},
  CurrencyExchanger: {screen: CurrencyExchanger},
  CurrencyList: {screen: CurrencyList},
  CurrencyDetailedInfo: {screen: CurrencyDetailedInfo},
});

const App = createAppContainer(MainNavigator);

export default App;