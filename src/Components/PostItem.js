import React from "react";
import {
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
} from "react-native";
import dateformat from "dateformat";
import Seprator from "./Seprator";
const PostItem = ({ post, onPress }) => {
  const { thumbnail, title, createdAt, author } = post;
  console.log(thumbnail);
  const getThumbnail = (uri) => {
    if (uri) return { uri };
    return require("../../assets/space.png");
  };

  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <Image
          source={getThumbnail(thumbnail)}
          style={{ width: 100, height: 100 / 1.7 }}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>
            {dateformat(createdAt, "mediumDate")} - {author}
          </Text>
        </View>
      </TouchableOpacity>
      <Seprator width="90%" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    marginVertical: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#383838",
  },
  date: {
    fontSize: 16,
    color: "#827E7E",
  },
});

export default PostItem;
