import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { getAllPosts, getPost } from "../Components/APIs/Fetch";
import dateformat from "dateformat";
import Seprator from "../Components/Seprator";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Touchable } from "react-native-web";

const height = getStatusBarHeight();
const WIDTH = Dimensions.get("window").width;
const Allposts = ({navigation}) => {
  const [AllPosts, setAllPosts] = useState([]);
  const fetchPosts = async () => {
    const { error, posts } = await getAllPosts();
    if (error) return console.log(error);
    setAllPosts(posts);
  };
  console.log(AllPosts);
  const getThumbnail = (uri) => {
    if (uri) return { uri };
    return require("../../assets/space.png");
  };

  const fetchSinglePost = async (slug) => {
    const { error, post } = await getPost(slug);
    if (error) console.log(error);
    navigation.navigate("Post", { post });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.Title}>
        <View style={[styles.btn, styles.shadow]}>
          <Text style={{ fontSize: 20, fontWeight: "700" }}>ALL POSTS</Text>
        </View>
      </View>

      <View style={styles.List}>
        <FlatList
          data={AllPosts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <>
                <TouchableOpacity
                  style={styles.post}
                  onPress={() => fetchSinglePost(item.slug)}
                >
                  <View style={{ borderWidth: 4, borderRadius: 10 }}>
                    <Image
                      style={styles.Image}
                      source={getThumbnail(item.thumbnail)}
                    />
                  </View>
                  <View style={styles.info}>
                    <Text style={styles.postTitle}>{item.title}</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={{ color: "#383838" }}>
                        {dateformat(item.createdAt, "mediumDate")}
                      </Text>
                      <Text style={{ color: "#383838" }}>{item.author}</Text>
                    </View>
                    <Text>{item.meta}</Text>
                  </View>
                </TouchableOpacity>
                <Seprator width="90%" />
              </>
            );
          }}
        />
      </View>
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
    justifyContent: "center",
    flexDirection: "row",
    marginVertical: 10,
  },
  btn: {
    backgroundColor: "white",
    borderRadius: 10,
    height: "70%",
    width: (WIDTH * 90) / 100,
    justifyContent: "center",
    marginHorizontal: 10,
    alignItems: "center",
  },
  List: {
    flex: 1,
    marginBottom: (WIDTH * 20) / 100,
  },
  post: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 5,
    marginHorizontal: 20,
  },
  Image: {
    width: 100,
    height: 100,
    borderWidth: 2,
  },
  info: {
    justifyContent: "center",
    width: "60%",
    marginHorizontal: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "700",
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
});

export default Allposts;
