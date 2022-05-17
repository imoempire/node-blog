import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Ionicons } from "@expo/vector-icons";
import dateformat from "dateformat";
import Relatedpost from "../Components/RelatedPost";
import Markdown from "react-native-markdown-display";
import * as Linking from "expo-linking";
import { getPost } from "../Components/APIs/Fetch";
import { back } from "react-native/Libraries/Animated/Easing";

const height = getStatusBarHeight();
const width = Dimensions.get("window").width;
const MyWeb = "myblog.com/blog";
const Post = ({ navigation, route }) => {
  const post = route.params?.post;
  if (!post) return null;

  // const rules = {
  //   paragraph: (node, children, parent, styles) => (
  //     <Text key={node.key} style={styles.paragraph} selectable>
  //       {children}
  //     </Text>
  //   ),
  // };

  const handlePressPost = async (slug)=>{
    const { error, post } = await getPost(slug);
      if(error) return console.log(error); 
      navigation.push("Post", { post });
  }

  const LinkPress = async (url) => {
    if (url.includes(MyWeb)) {
      const slug = url.split(MyWeb + "/")[1];
      if (!slug) return false;
      handlePressPost(slug)
      return false;
    }
    const result = await Linking.canOpenURL(url);
    if (result) Linking.openURL(url);
    else alert("Cannot open invalid url");
  };

  const { title, content, tags, slug, thumbnail, author, createdAt } = post;
  const getThumbnail = (uri) => {
    if (uri) return { uri };
    return require("../../assets/space.png");
  };
  return (
    <ScrollView style={{paddingTop: height}}>
      <ImageBackground style={{ width, height: width / 1.7 }} source={getThumbnail(thumbnail)}>
          <TouchableOpacity style={styles.backbtn} onPress={()=>navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
      </ImageBackground>
      <View style={{ padding: 10 }}>
        <Text
          style={{
            fontSize: 20,
            marginVertical: 15,
            color: "#000",
            fontWeight: "700",
          }}
        >
          {title}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 5,
          }}
        >
          <Text>By {author}</Text>
          <Text>By {dateformat(createdAt, "mediumDate")}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: "#b3b3b3" }}>Tags</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {tags.map((tag, index) => (
              <Text style={{ marginLeft: 5, color: "blue" }} key={tag + index}>
                #{tag}
              </Text>
            ))}
          </View>
        </View>
        <Markdown
          // rules={rules}
          onLinkPress={LinkPress}
          style={[styles.paragraph, styles.body, styles.link, styles.list_item]}
        >
          {content}
        </Markdown>
      </View>
      <View style={{marginHorizontal: 10}}>
      <Relatedpost OnPostPress={handlePressPost} postId={post.id} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  paragraph: {
    lineHeight: 20,
    color: "#545050",
    letterSpacing: 0.5,
  },
  body: {
    fontSize: 20,
  },
  link: {
    color: "#7784f8",
  },
  list_item: {
    color: "#545050",
    paddingVertical: 5,
  },
  backbtn:{
    backgroundColor: 'black',
    borderRadius: 20,
    width: width / 9,
    height:  width / 9,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Post;
