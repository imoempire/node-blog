import { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Image,
  View,
  FlatList,
  Dimensions,
  Text,
  TouchableOpacity
} from "react-native";
import { height } from "../Components/styles";
import { useNavigation } from "@react-navigation/native";
import { getPost } from "./APIs/Fetch";


const WIDTH = Dimensions.get("window").width - 20;
let currentSliderIndex = 0;
let intervalId;

export default function Slider({data, title}) {
  const [dataToRender, setDataToRender] = useState([]);
  const [visibleSlideIndex, setVisibleSlideIndex] = useState(0);
  const [activeSlideIndex, SetActiveSlideIndex] = useState(0);

  const navigation = useNavigation()

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
    if (dataToRender.length && flatListRef.current) {
      // startAutoScroll();
    }
  }, [dataToRender.length]);

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

  const getThumbnail = (uri) => {
    if (uri) return { uri };
    return require("../../assets/space.png");
  };

  const handlePressPost = async (slug) => {
    const { error, post } = await getPost(slug);
    if (error) return console.log(error);
    navigation.push("Post", { post });
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={()=>handlePressPost(item.slug)}>
        <Image source={getThumbnail(item.thumbnail)} style={styles.sliderImage} />
        <View style={{ width: WIDTH }}>
          <Text numberOfLines={2} style={styles.titleText}>
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.featured}>
        <Text style={styles.featuredText}>{title}</Text>
        <View style={styles.sliderIndex}>
          <SliderIndicator data={data} activeSlideIndex={activeSlideIndex} />
        </View>
      </View>
      <FlatList
        data={dataToRender}
        ref={flatListRef}
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialNumToRender={4}
        initialScrollIndex={1}
        getItemLayout={(_, index) => ({
          length: WIDTH,
          offset: WIDTH * index,
          index,
        })}
        keyExtractor={(item, index) => item.id + index}
        // onViewableItemsChanged={onViewableItemsChanged.current}
        // viewabilityConfig={viewabilityConfig.current}
        // onScrollBeginDrag={pauseAutoScroll}
        // onScrollEndDrag={startAutoScroll}
        renderItem={renderItem}
      />
    </View>
  );
}

const SliderIndicator = ({ data, activeSlideIndex }) =>
  data.map((item, index) => {
    return (
      <View
        key={item.id}
        style={[
          {
            backgroundColor:
              activeSlideIndex === index ? "#383838" : "transparent",
          },
          styles.sliderIndexList,
        ]}
      />
    );
  });

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: WIDTH,
    paddingTop: height,
  },
  featured: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  sliderIndex: {
    flexDirection: "row",
    alignItems: "center",
  },
  sliderIndexList: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    marginLeft: 5,
  },
  sliderImage: {
    width: WIDTH,
    height: WIDTH / 1.7,
    borderRadius: 10,
  },
  featuredText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#383838",
  },
  titleText: {
    fontWeight: "700",
    color: "#383838",
    fontSize: 22,
  },
});
