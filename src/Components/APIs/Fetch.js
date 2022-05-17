import client from "./Clients";

export const getFeaturedPosts = async () => {
   try {
   const {data} = await client("/featured");
   return data;
   } catch (error) {
      const {response} = error;
      if (response?.data) {
         return response.data;
      }
      return { error: error.message || error }; 
   }
};

export const getLatestPost = async (limit, pageNo) => {
   try {
   const {data} = await client(`/posts?limit=${limit}&pageNo=${pageNo}`);
   return data;
   } catch (error) {
      const {response} = error;
      if (response?.data) {
         return response.data;
      }
      return { error: error.message || error }; 
   }
}; 

export const getAllPosts = async () => {
   try {
   const {data} = await client(`/posts`);
   return data;
   } catch (error) {
      const {response} = error;
      if (response?.data) {
         return response.data;
      }
      return { error: error.message || error }; 
   }
};

export const getPost = async (slug) => {
   try {
   const {data} = await client(`/single/${slug}`);
   return data;
   } catch (error) {
      const {response} = error;
      if (response?.data) {
         return response.data;
      }
      return { error: error.message || error }; 
   }
};
export const getRelatedPost = async (id) => {
   try {
   const {data} = await client(`/related/${id}`);
   return data;
   } catch (error) {
      const {response} = error;
      if (response?.data) {
         return response.data;
      }
      return { error: error.message || error }; 
   }
};

export const searchPost = async (query) => {
   try {
      const {data} = await client(`/search?title=${query}`);
      return data;
      } catch (error) {
         const {response} = error;
         if (response?.data) {
            return response.data;
         }
         return { error: error.message || error }; 
      }
}
