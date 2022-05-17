import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

// const width = Dimensions.get("window").width
const Seprator = ({style, width="100%"}) => {
  return (
    <View
      style={[style, styles.container, {width}]}
    />
  );
};

const styles = StyleSheet.create({
   container: {
      height: 3,
      backgroundColor: "#d3d3d3",
      alignSelf: "center",
    }
});

export default Seprator;
