import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import axios from 'axios';

function ApiFilmes() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const apiKey = 'c040c405dc20b9d8a90f1646071e252f';

    axios.get('https://api.themoviedb.org/3/movie/popular', {
      params: {
        api_key: apiKey,
      },
    })
    .then(response => {
      setFilmes(response.data.results);
    })
    .catch(error => {
      console.error('Erro ao buscar filmes:', error);
    });
  }, []);

  const renderFilme = ({ item }) => (
    <View style={styles.item}>
      <Image
        style={styles.poster}
        source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }}
      />
      <Text>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Filmes</Text>
      <FlatList
        data={filmes}
        keyExtractor={item => item.id.toString()}
        renderItem={renderFilme}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  poster: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
});

export default ApiFilmes;
