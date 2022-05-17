import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Screens/Home";
import SearchPost from "../Screens/SearchPost";
import Allposts from "../Screens/AllPosts";
import { Feather, FontAwesome, Entypo, AntDesign } from "@expo/vector-icons";
import { View, Text } from "react-native";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator 
    screenOptions={{ 
       headerShown: false, 
       tabBarStyle: {
         height: 60,
         position: 'absolute', 
         bottom: 16,
         marginHorizontal: 20,
         borderRadius: 10,
         backgroundColor: 'black',
         opacity: .95
    } }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => (
            (color = "#412EB9"),
            (
              <View>
                <View>
                  <Feather
                    name="home"
                    size={24}
                    color={focused ? color : 'white'}
                  />
                </View>
              </View>
            )
          ),
          tabBarLabel: ({ focused, color, size }) => (
            (color = "#412EB9"),
            (size = 13),
            (
              <Text style={{ color: focused ? color : 'white', fontSize: size}}>
                Home
              </Text>
            )
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchPost}
        options={{
          tabBarIcon: ({ color, focused }) => (
            (color = "#412EB9"),
            (
              <View>
                <View>
                  <FontAwesome
                    name="search"
                    size={24}
                    color={focused ? color : 'white'}
                  />
                </View>
              </View>
            )
          ),
          tabBarLabel: ({ focused, color, size }) => (
            (color = "#412EB9"),
            (size = 13),
            (
              <Text style={{ color: focused ? color : 'white', fontSize: size}}>
                Search
              </Text>
            )
          ),
        }}
      />
      <Tab.Screen
        name="All"
        component={Allposts}
        options={{
          tabBarIcon: ({ color, focused }) => (
            (color = "#412EB9"),
            (
              <View>
                <View>
                  <AntDesign
                    name="appstore1"
                    size={24}
                    color={focused ? color : 'white'}
                  />
                </View>
              </View>
            )
          ),
          tabBarLabel: ({ focused, color, size }) => (
            (color = "#412EB9"),
            (size = 13),
            (
              <Text style={{ color: focused ? color : 'white', fontSize: size}}>
                All Post
              </Text>
            )
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
