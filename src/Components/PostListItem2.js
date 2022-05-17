import React from "react";
import {
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
  Dimensions,
} from "react-native";
import dateformat from "dateformat";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { getPost } from "./APIs/Fetch";

const width = Dimensions.get("window").width;

const Postlistitem = ({ post }) => {
  const { createdAt } = post;
  const { navigate } = useNavigation();
  const getThumbnail = (uri) => {
    if (uri) return { uri };
    return require("../../assets/space.png");
  };

  const fetchSinglePost = async (slug) => {
    const { error, post } = await getPost(slug);
    if (error) console.log(error);
    navigate("Post", { post });
  };

  return (
    <View style={{ marginHorizontal: 20 }}>
      <FlatList
        data={post}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => fetchSinglePost(item.slug)}>
              <ImageBackground
                imageStyle={{ borderRadius: 6 }}
                source={getThumbnail(item.thumbnail)}
                style={styles.container}
              >
                <TouchableOpacity style={styles.textContainer}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.date}>
                    {dateformat(createdAt, "mediumDate")} {item.author}
                  </Text>
                </TouchableOpacity>
              </ImageBackground>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: width - 150,
    marginHorizontal: 10,
    marginVertical: 20,
    borderRadius: 20,
  },
  textContainer: {
    backgroundColor: "white",
    marginHorizontal: 10,
    marginTop: 100,
    borderRadius: 5,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#383838",
    marginBottom: 5,
  },
  date: {
    fontSize: 16,
    color: "#827E7E",
  },
});

export default Postlistitem;
