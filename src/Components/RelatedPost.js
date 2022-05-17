import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { getPost, getRelatedPost } from "./APIs/Fetch";
import PostItem from "./PostItem";
import Postlistitem from "./PostListItem2";

const Relatedpost = ({ postId, OnPostPress }) => {
  const [posts, setPosts] = useState([]);
  
  const fetchRelated = async () => {
    const { error, post } = await getRelatedPost(postId);
    if (error) console.log(error);
    setPosts([...post]);
  };

  useEffect(() => {
    fetchRelated();
  }, [postId]);
  return (
    <View>
      <Text style={{fontSize: 20, fontWeight: '700', marginBottom: 10}}>Related Posts</Text>
      {posts.map((post) => {
        return (
          <PostItem
            onPress={() => OnPostPress(post.slug)}
            key={post.id}
            post={post}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Relatedpost;
