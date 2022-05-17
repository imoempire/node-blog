import { View, Dimensions, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./src/Navigation/Navigator";
import 'react-native-gesture-handler';
import { StatusBar } from "expo-status-bar";

const WIDTH = Dimensions.get("window").width - 20;

export default function App() {
 

  LogBox.ignoreAllLogs();
  return (
    <>
      <NavigationContainer>
        <Navigator/>
      </NavigationContainer>
    </>
  );
}
