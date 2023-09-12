import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Image, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [ingredient, setIngredient] = useState("");
  const [recipes, setRecipes] = useState([]);

  const searchRecipes = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
      .then(response => response.json())
      .then(data => setRecipes(data.meals))
      .catch(error => {
        console.error('Error:', error);
      });
  }
  const clear = () => {
    setRecipes([]);
    setIngredient("");
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={ingredient}
        onChangeText={text => setIngredient(text)}
      />
      <View style={styles.buttons}>
      <Button color={'orange'} title='Search' onPress={searchRecipes} />
      <Button color={'orange'} title='Clear' onPress={clear}/>
      </View>
      <StatusBar style="auto" />
      <View style={styles.flatListContainer}>
        <FlatList
          data={recipes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.flatListItem}>
              <Text style={styles.flatListItemText}>{item.strMeal}</Text>
              <Image
                style={styles.flatListImage}
                source={{ uri: item.strMealThumb }}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9b9b9b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 200,
    borderWidth: 2,
    marginTop: 50,
    marginBottom: 10,
    padding: 8,
    borderWidth: 3,
    borderRadius: 30,
    borderColor: 'orange',
    fontSize: 18
  },
  flatListContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  flatListItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderColor: 'orange',
  },
  flatListItemText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'orange',
    textTransform: 'uppercase', 
    textShadowRadius: 5,
    textShadowColor: 'black'
  },
  flatListImage: {
    width: 300,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 8,
    borderRadius: 35,
    borderColor: 'orange',
    borderWidth: 1
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 150,
    marginBottom: 10,
  },
});
