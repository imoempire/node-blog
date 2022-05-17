import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  ScrollView,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { FontAwesome } from "@expo/vector-icons";
import { getPost, searchPost } from "../Components/APIs/Fetch";
import PostItem from "../Components/PostItem";

const height = getStatusBarHeight();
const WIDTH = Dimensions.get("window").width;
const SearchPost = ({navigation}) => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]); 

  const handleSubmit = async () => {
    if (query.length === 0) {
      setResult([]);
    }
    if (!query.trim()) return;
    //   submit
    const { error, posts } = await searchPost(query);
    if (error) return console.log(error);
    setResult([...posts]);
  };

  const handlePressPost = async (slug) => {
    const { error, post } = await getPost(slug);
    if (error) return console.log(error);
    navigation.push("Post", { post });
  };

  useEffect(() => {
    handleSubmit();
  }, [query]);

  return (
    <View style={styles.container}>
      <View style={styles.Title}>
        <View style={[styles.btn, styles.shadow]}>
          <TextInput
            value={query}
            onChangeText={(text) => setQuery(text)}
            placeholder="Search Post"
            onSubmitEditing={handleSubmit}
          />
        </View>
      </View>
      <ScrollView style={styles.result}>
        {result.map((post) => {
          return (
            <View key={post.id} style={{ backgroundColor: "white" }}>
              <PostItem
                post={post}
                onPress={() => handlePressPost(post.slug)}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: height,
  },
  Title: {
    flex: 0.1,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    backgroundColor: "white",
    borderRadius: 10,
    height: "70%",
    width: (WIDTH * 80) / 100,
    justifyContent: "center",
    marginHorizontal: 10,
    paddingLeft: 10,
  },
  search: {
    backgroundColor: "white",
    borderRadius: 10,
    height: "70%",
    width: 50,
    justifyContent: "center",
    marginHorizontal: 10,
    alignItems: "center",
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 10,
  },
  result: {
    flex: 1,
    //  backgroundColor: "red",
    marginHorizontal: 20,
  },
});

export default SearchPost;
