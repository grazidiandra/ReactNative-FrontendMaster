import React from 'react';
import { TouchableOpacity, Text, StyleSheet, FlatList, View } from 'react-native';

const PalettePreview = ({ palette, handlePress }) => {
  
  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={styles.text}>{palette.paletteName}</Text>
      <FlatList style={styles.list} horizontal={true} data={palette.colors.slice(0, 5)} keyExtractor={item => item.colorName} renderItem={({ item }) => (
    <View style={[styles.box, { backgroundColor: item.hexCode }]} />
)}/>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10
  },
  list: {
    marginBottom: 20,
    flexDirection: 'row',
  },
  box: {
    height: 30,
    width: 30,
    marginLeft: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 2,
  }
})

export default PalettePreview;
