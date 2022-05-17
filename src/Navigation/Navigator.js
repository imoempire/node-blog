import { createStackNavigator } from "@react-navigation/stack";
import Post from "../Screens/Post";
import Tabs from "./Tabs";

const Stack = createStackNavigator();

const Navigator = ()=>{
   return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
         <Stack.Screen name="Tabs" component={Tabs}/>
         <Stack.Screen name="Post" component={Post}/>
      </Stack.Navigator>
   )
}

export default Navigator