import axios from "axios";

const client = axios.create({baseURL: "http://172.20.10.4:4848/api/post"});

export default client;


{/* <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      ListHeaderComponent={ListHeaderComponenet}
      ItemSeparatorComponent={() => <Seprator style={{marginTop: 15}} />}
      renderItem={({ item }) => {
        return <View style={{marginTop: 15}}>
          <PostlistItem2 post={item}/>
        </View>;
      }}
    /> */}


    // const ListHeaderComponenet = () => {
    //   return (
    //     <View>
    //       <Slider data={data} title="Featured Posts" />
    //       <View>
    //       <Seprator width="90%"/>
    //       <Text style={{fontWeight: "700",color: "#383838",fontSize: 22}}>Latest Posts</Text>
    //       </View>
    //     </View>
    //   );
    // };


    const data = [
      {
        id: "123ec",
        thumbnail:
          "https://pharmanewsonline.com/wp-content/uploads/2016/02/Non-healthy-dood.jpg",
        title: "Makin Ice Cream",
        author: "Admin",
        createdAt: Date.now()
      },
      {
        id: "bjudd",
        thumbnail:
          "https://cdn.britannica.com/50/80550-050-5D392AC7/Scoops-kinds-ice-cream.jpg",
        title: "Makin Ice Cream Rolls",
        author: "Admin",
        createdAt: Date.now()
      },
      {
        id: "kbjsd",
        thumbnail:
          "https://img.freepik.com/free-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000",
        title: "Makin the food delicious",
        author: "Admin",
        createdAt: Date.now()
      },
      {
        id: "jbddjsdk",
        thumbnail:
          "https://media.gettyimages.com/photos/independence-arch-accra-ghana-picture-id979874264?s=612x612",
        title: "Bread Making",
        author: "Admin",
        createdAt: Date.now()
      },
      {
        id: "ljbjdslj",
        thumbnail:
          "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
        title: "Makin The perfect Rolls",
        author: "Admin",
        createdAt: Date.now()
      },
      {
        id: "ljbscjdslj",
        thumbnail: "",
        title: "Makin The perfect Rolls",
        author: "Admin",
        createdAt: Date.now()
      },
    ];