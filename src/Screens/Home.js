import { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Text, LogBox } from "react-native";
import Slider from "../Components/Slider";
import Seprator from "../Components/Seprator";
import PostlistItem2 from "../Components/PostListItem2";
import { getFeaturedPosts, getLatestPost } from "../Components/APIs/Fetch";
import { getStatusBarHeight } from "react-native-status-bar-height";




const WIDTH = Dimensions.get("window").width - 20;

let pageNo = 0;
const limit = 5;

const Home=() =>{
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [reached, setReached] = useState();

  const height = getStatusBarHeight()

  const fetchFeaturedPosts = async () => {
    const { error, posts } = await getFeaturedPosts();
    if (error) return console.log(error);
    setFeaturedPosts(posts);
  };

  const fetchLatestPosts = async () => {
    const { error, posts, postCount } = await getLatestPost(limit, pageNo);
    if (error) return console.log(error);

    if(postCount.length === latestPosts.length) return setReached(true);

    setLatestPosts(posts);
  };


  useEffect(() => {
    fetchFeaturedPosts();
    fetchLatestPosts();
  }, []);

  LogBox.ignoreAllLogs();
  return (
    <View style={styles.container}>
      {featuredPosts.length ? (
        <Slider data={featuredPosts} title="Featured Posts" />
      ) : null}
      <View style={{ marginTop: 10, padding: 10 }}>
        <Seprator width="90%" />
        <Text style={{ fontWeight: "700", color: "#383838", fontSize: 22 }}>
          Latest Posts
        </Text>
      </View>
      <PostlistItem2 post={latestPosts} />
    </View>
  );
}


const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'white'
   }
})

export default Home;