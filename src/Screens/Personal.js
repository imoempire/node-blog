import React from 'react';
import {View, StyleSheet} from 'react-native';

const Personal = () => {
   return (
      <View style={styles.container}>
         <Text>Personal</Text>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'blue'
   }
})

export default Personal;
