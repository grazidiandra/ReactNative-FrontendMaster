import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
} from 'react-native';

import PalettePreview from '../components/PalettePreview';
import URL from '../server/api';



const Home = ({ navigation, route }) => {
  const newPalette = route.params ? route.params.newPalette : null;
  const [colors, setColors] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleColors = useCallback(async () => {
    const response = await fetch(URL);
      if (response.ok) {
        const colors = await response.json();
        setColors(colors);
      }
  }, []);


  useEffect(()=> {
    handleColors();
  }, [])

  useEffect(() => {
    if (newPalette) {
      setColors(current => [newPalette, ...current]);
    }
  }, [newPalette]);

  const handleRefreshing = useCallback( async () => {
    setIsRefreshing(true);
    await handleColors();
    setIsRefreshing(false);
    },
    [],
  )

  return (
    <>
    <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddNewPaletteModal')}
      >
        <Text style={styles.buttonText}>Add a color scheme</Text>
      </TouchableOpacity>
      <FlatList
        style={styles.list}
        data={colors}
        keyExtractor={item => item.paletteName}
        renderItem={({ item }) => (
          <PalettePreview  handlePress={() => navigation.navigate('ColorPalette', item)} palette={item} />
        )}
        refreshing={isRefreshing}
        onRefresh={()=>{handleRefreshing}}
      />
   </>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
    backgroundColor: "white"
  },
  button: {
    height: 50,
    backgroundColor: 'white',
    padding: 10,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'teal',
  },
})

export default Home;