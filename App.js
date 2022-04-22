import { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Image,
  View,
  FlatList,
  Dimensions,
  Text,
} from "react-native";
import { height } from "./src/Components/styles";

const data = [
  {
    id: "123ec",
    thumbnail:
      "https://pharmanewsonline.com/wp-content/uploads/2016/02/Non-healthy-dood.jpg",
    title: "Makin Ice Cream",
    author: "Admin",
  },
  {
    id: "bjudd",
    thumbnail:
      "https://cdn.britannica.com/50/80550-050-5D392AC7/Scoops-kinds-ice-cream.jpg",
    title: "Makin Ice Cream Rolls",
    author: "Admin",
  },
  {
    id: "kbjsd",
    thumbnail:
      "https://img.freepik.com/free-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000",
    title: "Makin the food delicious",
    author: "Admin",
  },
  {
    id: "jbddjsdk",
    thumbnail:
      "https://media.gettyimages.com/photos/independence-arch-accra-ghana-picture-id979874264?s=612x612",
    title: "Bread Making",
    author: "Admin",
  },
  {
    id: "ljbjdslj",
    thumbnail:
      "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    title: "Makin The perfect Rolls",
    author: "Admin",
  },
];

const WIDTH = Dimensions.get("window").width - 20;
let currentSliderIndex = 0;
let intervalId;

export default function App() {
  const [dataToRender, setDataToRender] = useState([]);
  const [visibleSlideIndex, setVisibleSlideIndex] = useState(0);
  const [activeSlideIndex, SetActiveSlideIndex] = useState(0);
  
  const flatListRef = useRef();

  const handleScroll = (index) => {
    flatListRef.current.scrollToIndex({ animated: false, index });
  };

  const startAutoScroll = () => {
    if (currentSliderIndex <= dataToRender.length - 2) {
      intervalId = setInterval(() => {
        flatListRef.current.scrollToIndex({
          animated: true,
          index: currentSliderIndex + 1,
        });
      }, 4000);
    } else {
      pauseAutoScroll();
    }
  };

  const pauseAutoScroll = () => {
    clearInterval(intervalId);
  };

  useEffect(() => {
    if(dataToRender.length && flatListRef.current){
      startAutoScroll();
    }
  },[dataToRender.length]);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    currentSliderIndex = viewableItems[0]?.index || 0;
    setVisibleSlideIndex(currentSliderIndex);
  });

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  useEffect(() => {
    const newData = [[...data].pop(), ...data, [...data].shift()];
    setDataToRender([...newData]);
  }, [data.length]);

  useEffect(() => {
    const length = dataToRender.length;
    // Reset slide to first
    if (visibleSlideIndex === length - 1 && length) handleScroll(1);
    // Reset visible to last
    if (visibleSlideIndex === 0 && length) handleScroll(length - 2);

    const lastSlide = currentSliderIndex === length - 1;
    const firstSlide = currentSliderIndex === 0;

    if (lastSlide && length) SetActiveSlideIndex(0);
    else if (firstSlide && length) SetActiveSlideIndex(length - 2);
    else SetActiveSlideIndex(currentSliderIndex - 1);
  }, [visibleSlideIndex]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginVertical: 10,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "700", color: "#383838" }}>
          Featured Posts
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {data.map((item, index) => {
            return (
              <View
                key={item.id}
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  borderWidth: 2,
                  marginLeft: 5,
                  backgroundColor:
                    activeSlideIndex === index ? "#383838" : "transparent",
                }}
              ></View>
            );
          })}
        </View>
      </View>
      <FlatList
        data={dataToRender}
        ref={flatListRef}
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={1}
        getItemLayout={(_, index) => ({
          length: WIDTH,
          offset: WIDTH * index,
          index,
        })}
        keyExtractor={(item, index) => item.id + index}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
        onScrollBeginDrag={pauseAutoScroll}
        onScrollEndDrag={startAutoScroll}
        renderItem={({ item }) => {
          return (
            <View>
              <Image
                source={{
                  uri: item.thumbnail,
                }}
                style={{
                  width: WIDTH,
                  height: WIDTH / 1.7,
                  borderRadius: 10,
                }}
              />
              <View style={{width: WIDTH}} >
              <Text numberOfLines={2} style={{fontWeight: '700', color: '#383838', fontSize: 22}}> {item.title} </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: WIDTH,
    paddingTop: height,
  },
});
